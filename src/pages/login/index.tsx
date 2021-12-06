import React, { useState } from "react";
import { Form, Input, Button, Card, Message } from "@arco-design/web-react";
import useFetch from "@/hooks/useFetch";
import {
  loginFetchConfig,
  createFetchConfig,
  sendCreateMailConfig,
} from "./actionCreator";
import "./index.scss";
import localStorageUtils from "@/Utils/localStorageUtils";
import { history } from "@/route";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Login: React.FC = () => {
  const [formRegister] = Form.useForm();
  const [registerState, setRegisterState] = useState(true);
  const [loading, setloading] = useState(0);
  const { run: login } = useFetch(loginFetchConfig);
  const { run: register } = useFetch(createFetchConfig);
  const { run: sendCreateMail } = useFetch(sendCreateMailConfig);

  // 校验成功的回掉
  const onSubmit = (values: any) => {
    // console.log(values)
    login(values).then((res) => {
      // 登陆成功写入数据
      localStorageUtils.set(res.data);
      // 登陆成功提示
      Message.success("登陆成功");
      // 跳转到管理页面
      history.push({ pathname: "/" });
    });
  };

  const onRegister = (values: any) => {
    console.log(values);
    // console.log(values)
    register(values).then((res) => {
      // 注册成功提示
      Message.success("注册成功");
      setRegisterState(false);
    });
  };
  // 校验失败的回掉
  const onSubmitFailed = (errorInfo: any) => {
    Message.error("请正确填写账号密码");
  };

  const downCounter = () => {
    formRegister
      .validate(["email"])
      .then(() => {
        sendCreateMail({ email: formRegister.getFieldValue("email") }).then(
          (res) => {
            if (formRegister.getFieldValue("email")) setloading(60);
            let num = 59;
            let time = setInterval(() => {
              if (num === 0) {
                clearInterval(time);
              }
              setloading(num--);
            }, 1000);
          }
        );
      })
      .catch((res) => {});
  };
  return (
    <div className="index-page">
      {registerState ? (
        <Card className="index-card-box register-box">
          <h3 className="index-box-title">注册</h3>
          <Form
            {...layout}
            size="large"
            name="register"
            form={formRegister}
            className="register-form"
            onSubmit={onRegister}
            onSubmitFailed={onSubmitFailed}
          >
            <Form.Item
              label="用户名"
              field="name"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮箱"
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
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              field="password"
              rules={[
                {
                  type: "string",
                  minLength: 3,
                  validateLevel: "warning",
                  message: "密码至少三位",
                },
                { required: true, message: "请输入密码" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="验证码"
              field="verifyCode"
              rules={[
                {
                  type: "string",
                  length: 6,
                  validateLevel: "warning",
                  message: "请输入六位验证码",
                },
                { required: true, message: "请输入验证码" },
              ]}
            >
              <Input
                addAfter={
                  <Button
                    className=""
                    onClick={() => downCounter()}
                    disabled={Boolean(loading)}
                    type="primary"
                  >
                    {loading ? `${loading}秒之后重发` : "发送验证码"}
                  </Button>
                }
              />
            </Form.Item>
            <div className="operation-buttons">
              <Button
                className="operation-button cancel-btn"
                onClick={() => setRegisterState(false)}
              >
                取消
              </Button>
              <Button
                className="operation-button login-btn"
                type="primary"
                htmlType="submit"
              >
                确认
              </Button>
            </div>
          </Form>
        </Card>
      ) : (
        <Card className="index-card-box login-box">
          <h3 className="index-box-title">Issue新闻</h3>
          <Form
            {...layout}
            size="large"
            name="login"
            className="login-form"
            onSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
          >
            <Form.Item
              label="邮箱"
              field="email"
              rules={[
                {
                  type: "email",
                  validateLevel: "warning",
                  message: "请输入正确的邮箱",
                },
                { required: true, message: "请输入邮箱" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              field="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password />
            </Form.Item>
            <div className="operation-buttons">
              <Button
                className="operation-button cancel-btn"
                onClick={() => setRegisterState(true)}
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
        </Card>
      )}
    </div>
  );
};
export default Login;
