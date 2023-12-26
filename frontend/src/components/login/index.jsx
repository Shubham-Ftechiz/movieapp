import React from "react";
import { Form, Input, Button, Checkbox, Typography, Space} from "antd";
import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../contants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
    const navigate = useNavigate();

  const onSubmit = values => {

    if (values.email === "" || values.password === "") {
      toast.error("Please enter email id or password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
    
    if (values.email && values.password) {
      fetch(LOGIN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then((jsonResp) => {
          if (jsonResp.message === "Login Successfully") {
            localStorage.setItem("token", jsonResp.token);
            toast.success(jsonResp.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000)
          }
          else {
            toast.error(jsonResp.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              theme: "light",
            });
          }
        })
        .catch(error => console.error(error));
    };
  };

  return (
    <div className="mainLogin">
      <div className="subLogin">
        <div className="heading" level={2}>
          Sign in
        </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
        >
          <Input
              className="loginEmailText"
              placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
        >
            <Input
              className="loginPassword"
              type="password"
              placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" className="alignCheckBox">
            <Checkbox style={{color:"white"}}>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
         
        </Form.Item>
      </Form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />

      </div>
    </div>
  );
};

export default login;