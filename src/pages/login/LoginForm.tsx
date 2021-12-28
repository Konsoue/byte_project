import React from "react";
import { Form, Input, Button, Message } from "@arco-design/web-react";
import useFetch from "@/hooks/useFetch";
import { loginFetchConfig } from "./actionCreator";
import "./index.scss";
import localStorageUtils from "@/Utils/localStorageUtils";
import { history } from "@/route";
import { ILoginFormProps } from "./types";
import { IconEmail, IconPen } from "@arco-design/web-react/icon";
import { useReduxDispatch } from "@/redux";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const LoginForm: React.FC<ILoginFormProps> = ({ setStatus }) => {
  const [formLogin] = Form.useForm();
  const { run: login } = useFetch(loginFetchConfig);
  const dispatch = useReduxDispatch();

  // 校验成功的回掉
  const onSubmit = (values: any) => {
    login(values).then((res) => {
      const user = res.data.user;
      // 登陆成功写入数据
      localStorageUtils.set(res.data);
      // 登陆成功提示
      Message.success("登陆成功");
      // 跳转到管理页面
      history.push({ pathname: "/" });
      dispatch({
        type: "userData/setData",
        payload: {
          name: user.name,
          avatar: user.avatar,
          login: true
        },
      })
    });
  };

  // 校验失败的回掉
  const onSubmitFailed = (errorInfo: any) => {
    Message.error("请正确填写账号密码");
  };

  return (
    <>
      <h3 className="index-box-title">
        <div className="title-font"></div>
      </h3>
      <Form
        {...layout}
        size="large"
        name="login"
        form={formLogin}
        className="login-form"
        onSubmit={onSubmit}
        onSubmitFailed={onSubmitFailed}
      >
        <Form.Item
          label={
            <>
              邮箱&nbsp;
              <IconEmail />
            </>
          }
          field="email"
          rules={[
            {
              type: "email",
              validateLevel: "error",
              message: "请输入正确的邮箱",
            },
            { required: true, message: "请输入邮箱" },
          ]}
        >
          <Input placeholder="输入登录的邮箱" />
        </Form.Item>

        <Form.Item
          label={
            <>
              密码&nbsp;
              <IconPen />
            </>
          }
          field="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="输入密码" />
        </Form.Item>

        <div className="forget-box">
          <Button
            type="text"
            className="forget-password"
            onClick={() => {
              // 点击注册切换至注册框
              setStatus && setStatus("forget");
            }}
          >
            忘记密码
          </Button>
        </div>
        <div className="operation-buttons">
          <Button
            className="operation-button cancel-btn"
            onClick={() => {
              // 点击注册切换至注册框
              setStatus && setStatus("register");
            }}
          >
            注册
          </Button>
          <Button
            className="operation-button login-btn"
            type="primary"
            htmlType="submit"
          >
            登陆
          </Button>
        </div>
      </Form>
    </>
  );
};
export default LoginForm;
