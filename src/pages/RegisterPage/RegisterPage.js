import React, { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Modal } from "antd";
import axios from "axios";
import Lottie from "lottie-react";
import signupAnimation from "../../asset/register.json";
import failAnimation from "../../asset/fail.json";
import successAnimation from "../../asset/success.json";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const [modalFailOpen, setModalFailOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const showModalFail = () => {
    setModalFailOpen(true);
  };
  const showModalSuccess = () => {
    setModalSuccessOpen(true);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onFinish = () => {
    axios
      .post("https://face-recognition-server.onrender.com/register", {
        email: email,
        password: password,
        name: name,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          showModalSuccess();
          setTimeout(() => {
            window.location.href = "/signin";
          }, 2000);
        } else if (response.status === 400) {
          showModalFail();
        }
      });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px] lg:w-[500px]" hoverable>
        <Lottie
          className="w-[10em] mx-auto"
          animationData={signupAnimation}
          loop={true}
        />
        <h2 className="text-4xl font-bold mb-10 mt-5">Sign Up</h2>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
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
            <Input onChange={onEmailChange} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password type="new-password" onChange={onPasswordChange} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input onChange={onNameChange} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>I have read the agreement</Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              htmlType="submit"
              className="bg-teal-500 text-white hover:bg-teal-600 hover:text-white hover:border-white"
            >
              Register
            </Button>
            <p>
              Already have an account? <a href="/signin">Sign in now!</a>
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
          Oops! Email already exists.
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
        <p className="font-bold text-center text-xl">Congratulations!</p>
      </Modal>
    </div>
  );
}
