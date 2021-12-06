import React, { useState } from "react";
import { Form, Input, Button, Card, Message } from "@arco-design/web-react";
import useFetch from "@/hooks/useFetch";
import { createFetchConfig, sendCreateMailConfig } from "./actionCreator";
import { ILoginFormProps } from "./types";
import "./index.scss";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const RegisterForm: React.FC<ILoginFormProps> = ({ setRegisterState }) => {
  const [formRegister] = Form.useForm();
  const [loading, setloading] = useState(0);
  const { run: register } = useFetch(createFetchConfig);
  const { run: sendCreateMail } = useFetch(sendCreateMailConfig);

  const onRegister = (values: any) => {
    register(values).then((res) => {
      // 注册成功提示
      Message.success("注册成功");
      setRegisterState && setRegisterState(false);
    });
  };
  // 校验失败的回掉
  const onSubmitFailed = (errorInfo: any) => {
    Message.error("请正确填写账号密码");
  };

  const downCounter = () => {
    formRegister
      .validate(["email"])
      .then((res) => {
        console.log(res);
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
      .catch(() => {
        Message.error("请输入正确的邮箱格式");
      });
  };
  return (
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
              validateLevel: "error",
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
              validateLevel: "error",
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
            onClick={() => {
              setRegisterState && setRegisterState(false);
            }}
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
  );
};
export default RegisterForm;
