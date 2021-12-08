import axios from "axios";
import { history } from "@/route";
import { Modal, Message } from "@arco-design/web-react";
import { fetchFunc } from "./types";
import localStorageUtils from "@/Utils/localStorageUtils";
import { IInitHeader } from "./types";
// 从cookie获取鉴权
let initHeader: IInitHeader = {
  "Content-Type": "application/json",
};

// 创建axios实例
const instance = axios.create({
  withCredentials: true, // 开启这个配置项才可以接受服务器端发送的cookies
  baseURL: "",
  timeout: 1000000, // 设置超时时间10s
});

// 是否拦截中，用于保证多次请求只有一个拦截提示modal
let isInterceptoring = false;
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    const { pathname } = history.location;
    // 要过滤掉的路由
    const filterPathNames = ["/login", "/"];
    // 要过滤掉的url
    const filterUrls = [
      "/api/news/visitorGetNewsItem",
      "/api/news/getNewsType",
      "/api/news/visitorGetNewsDigest",
    ];
    // 因为dataPreview的接口太多了，因此用路由排除
    let isFilterPathName = filterPathNames.indexOf(pathname) === -1;
    // 由于有可能页面跳转了仍然未完成请求，被modal拦截，因此需要排除掉登陆和注册接口
    let isFilterUrl = config.url
      ? filterUrls.indexOf(config.url) === -1
      : false;
    // 如果是非拦截状态，且不在要过滤的url或者pathname中才显示拦截提示模态框
    if (
      !isInterceptoring &&
      isFilterPathName &&
      isFilterUrl &&
      JSON.stringify(localStorageUtils.get()) === "{}" // 判断是否处于登陆状态
    ) {
      isInterceptoring = true;
      Modal.confirm({
        title: "登陆过期提示",
        content: "登陆状态已过期，请重新登陆，点击确定将返回登录",
        onOk: () => {
          isInterceptoring = false;
          history.replace("/login");
        },
        onCancel: () => {
          isInterceptoring = false;
        },
      });
    } else {
      return config;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data, config } = response;
    if (config.responseType === "arraybuffer") {
      return window.URL.createObjectURL(
        new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
    }
    if (data.status.toString()[0] === "2") {
      return data;
    } else {
      Message.error(data.message);
      return Promise.reject(data);
    }
  },
  (error) => {
    const res = error.response.data;
    // 对响应错误做点什么
    if (error.response.status === "500") {
      Message.clear();
      Message.error("网络超时");
    } else {
      Message.error(res.message);
    }
    return Promise.reject(error);
  }
);

// 转为formdata
const toFormData = (data: any) => {
  var formData = new FormData();
  Object.keys(data).forEach((key) => {
    let dataKey = data[key];
    if (Array.isArray(dataKey)) {
      // 发送数组
      for (let i = 0; i < dataKey.length; i++) {
        formData.append(`${key}`, dataKey[i]);
      }
    } else {
      formData.append(key, dataKey);
    }
  });
  return formData;
};
// 序列化参数
const stringifyData = (data: any) => {
  let res: any[] = [];
  Object.keys(data).forEach((key) => {
    if (data[key] === null || data[key] === undefined) {
    } else {
      res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
  });
  return res.join("&");
};
const fetch: fetchFunc<any> = ({ url, type, headers, data, responseType }) => {
  // 如果存在登陆数据则添加鉴权
  JSON.stringify(localStorageUtils.get()) !== "{}" &&
    (initHeader.Authorization = localStorageUtils.get().token);
  // 改造为axios的请求参数
  let dataKeyName = type && type.toLowerCase() === "get" ? "params" : "data";
  let requsetPromise = instance.request({
    method: type ? type : "get",
    url: url.trim(),
    headers: Object.assign(initHeader, headers) as any,
    [dataKeyName]: data ? data : {},
    responseType: responseType ? responseType : "json",
    transformRequest: function (data, headers: any) {
      if (data) {
        switch (headers["Content-Type"]) {
          case "application/json":
            return JSON.stringify(data);
          case "multipart/form-data":
            // 如果post请求的请求格式为formdata则需转为formdata
            return toFormData(data);
          case "application/x-www-form-urlencoded":
            return stringifyData(data);
          default:
            break;
        }
      }
      return data;
    },
  });

  return requsetPromise;
};

export default fetch;
