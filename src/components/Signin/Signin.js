import React from "react";
import { Button, Form, Input, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function Signin() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card hoverable style={{ width: 500, height: 500 }}>
        <h1 className="text-4xl font-bold mb-10">Sign In</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <p>
              Or <a href="">register now!</a>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
