import React from "react";
import { Form, Input, Button, Card, Message } from "@arco-design/web-react";
import useFetch from "@/hooks/useFetch";
import { loginFetchConfig } from "./actionCreator";
import "./index.scss";
import localStorageUtils from "@/Utils/localStorageUtils";
import { history } from "@/route";
import { ILoginFormProps } from "./types";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const LoginForm: React.FC<ILoginFormProps> = ({ setRegisterState }) => {
  const [formLogin] = Form.useForm();
  const { run: login } = useFetch(loginFetchConfig);

  // 校验成功的回掉
  const onSubmit = (values: any) => {
    login(values).then((res) => {
      // 登陆成功写入数据
      localStorageUtils.set(res.data);
      // 登陆成功提示
      Message.success("登陆成功");
      // 跳转到管理页面
      history.push({ pathname: "/" });
    });
  };

  // 校验失败的回掉
  const onSubmitFailed = (errorInfo: any) => {
    Message.error("请正确填写账号密码");
  };

  return (
    <Card className="index-card-box login-box">
      <h3 className="index-box-title">Issue新闻</h3>
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
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="operation-buttons">
          <Button
            className="operation-button cancel-btn"
            onClick={() => {
              setRegisterState && setRegisterState(true);
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
    </Card>
  );
};
export default LoginForm;
