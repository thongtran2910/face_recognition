import React from "react";
import { Button, Form, Input, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import signinAnimation from "../../asset/signin.json";

export default function Signin() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px] lg:w-[500px]" hoverable>
        <Lottie
          className="w-[10em] mx-auto border-4 rounded-full border-teal-600"
          animationData={signinAnimation}
          loop={true}
        />
        <h2 className="text-4xl font-bold mb-10 mt-5">Sign In</h2>
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
