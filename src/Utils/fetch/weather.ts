import axios from "axios";
import { Message } from "@arco-design/web-react";
import { fetchFunc } from "./types";

const instance = axios.create({
  baseURL: "http://wthrcdn.etouch.cn/",
  timeout: 1000000, // 设置超时时间10s
});

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.status.toString() === "1000") {
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
)


const fetch: fetchFunc<any> = ({ url, type, headers, data, responseType }) => {
  let dataKeyName = type && type.toLowerCase() === "get" ? "params" : "data";

  const requsetPromise = instance.request({
    method: type ? type : "get",
    url: url.trim(),
    headers,
    [dataKeyName]: data ? data : {},
    responseType: responseType ? responseType : "json",
  })

  return requsetPromise;
}

export default fetch;