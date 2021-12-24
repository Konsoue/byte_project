import React from "react";
import { Form, Input, Button, Message } from "@arco-design/web-react";
import useFetch from "@/hooks/useFetch";
import { resetPasswordConfig } from "./actionCreator";
import { IconPen } from "@arco-design/web-react/icon";
import "./index.scss";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ForgetForm: React.FC = () => {
  const [formForget] = Form.useForm();
  const { run: reset } = useFetch(resetPasswordConfig);

  const onForget = (values: any) => {
    reset(values).then((res) => {
      // 注册成功提示
      Message.success("密码重置成功");
      formForget.resetFields();
    });
  };
  // 校验失败的回掉
  const onSubmitFailed = (errorInfo: any) => {
    Message.error("请正确填写格式");
  };

  return (
    <>
      <h3 className="index-box-title">
        <div className="title-font"></div>
      </h3>
      <Form
        {...layout}
        size="large"
        name="reset"
        form={formForget}
        className="reset-form"
        onSubmit={onForget}
        onSubmitFailed={onSubmitFailed}
      >
        <Form.Item
          label={
            <>
              旧密码&nbsp;
              <IconPen />
            </>
          }
          field="oldPassword"
          rules={[
            {
              type: "string",
              minLength: 3,
              validateLevel: "error",
              message: "密码至少三位",
            },
            { required: true, message: "请输入旧密码" },
          ]}
        >
          <Input.Password placeholder="输入旧密码" />
        </Form.Item>

        <Form.Item
          label={
            <>
              新密码&nbsp;
              <IconPen />
            </>
          }
          field="newPassword"
          rules={[
            {
              type: "string",
              minLength: 3,
              validateLevel: "error",
              message: "密码至少三位",
            },
            { required: true, message: "请输入新密码" },
          ]}
        >
          <Input.Password placeholder="输入至少三位的新密码" />
        </Form.Item>

        <div className="operation-buttons">
          <Button
            className="operation-button cancel-btn"
            onClick={() => {
              formForget.resetFields();
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
    </>
  );
};
export default ForgetForm;
