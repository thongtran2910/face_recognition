import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import signinAnimation from "../../asset/signin.json";
import failAnimation from "../../asset/fail.json";
import successAnimation from "../../asset/success.json";
import axios from "axios";

export default function SigninPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [modalFailOpen, setModalFailOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const showModalFail = () => {
    setModalFailOpen(true);
  };
  const showModalSuccess = () => {
    setModalSuccessOpen(true);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (data) => {
    navigate("/", {
      state: {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
        },
      },
    });
  };

  const onFinish = () => {
    axios
      .post("https://cruel-walk-production.up.railway.app/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        showModalSuccess();
        setTimeout(() => {
          if (response.data.id) {
            handleSubmit(response.data);
          }
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        showModalFail();
      });
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
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              onChange={onEmailChange}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
            <Input.Password
              onChange={onPasswordChange}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="current-password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-teal-500 text-white hover:bg-teal-600 hover:text-white hover:border-white"
            >
              Log in
            </Button>
            <p>
              Or <a href="/register">register now!</a>
            </p>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        onCancel={() => setModalFailOpen(false)}
        footer={null}
        closable={false}
        open={modalFailOpen}
        width={400}
      >
        <Lottie
          className="w-[10em] mx-auto"
          animationData={failAnimation}
          loop={true}
        />
        <p className="font-bold text-center text-xl">
          Please check your Email or Password
        </p>
      </Modal>
      <Modal
        onCancel={() => setModalSuccessOpen(false)}
        footer={null}
        closable={false}
        open={modalSuccessOpen}
        width={400}
      >
        <Lottie
          className="w-[10em] mx-auto"
          animationData={successAnimation}
          loop={true}
        />
        <p className="font-bold text-center text-xl">Sign in success</p>
      </Modal>
    </div>
  );
}
