import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./registeration.scss";
import { BASE_URL } from "../../contants";
import {
  Card,
  Row,
  Col,
  Input,
  Form,
  Space,
  Checkbox,
  Button,
  Typography,
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registeration = () => {
  const { Title, Paragraph } = Typography;
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { confirmPassword, ...formData } = values;
    if (formData.password === confirmPassword) {
      formData.role = "admin";
      await axios
        .post(`${BASE_URL}/api/register`, formData)
        .then((response) => {
          if (response.data.message === "User Created") {
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              theme: "light",
            });
            setTimeout(() => {
                navigate("/");
            }, 2000)
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              theme: "light",
            });
          }
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="bg-img">
      <Row align="middle" justify="center" className="row-padding">
        <Col>
          <Card className="card">
            <div className="card-div">
              <Title className="heading" level={2}>
                Get started with Us
              </Title>
              <Space>
                <Paragraph className="paragraph">
                  Register a new membership
                </Paragraph>
              </Space>
            </div>

            <div className="card-div">
              <Form
                wrapperCol={{
                  span: 24,
                }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name!",
                    },
                  ]}
                >
                  <Input
                    className="rest-form-font"
                    addonBefore={<UserOutlined />}
                    placeholder="Full Name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    className="rest-form-font"
                    addonBefore={<MailOutlined />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input.Password
                    className="rest-form-font"
                    addonBefore={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className="rest-form-font"
                    addonBefore={<LockOutlined />}
                    placeholder="Retype Password"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="text-left">
                    <Checkbox className="rest-form-font" onChange={onChange}>
                      I agree to the{" "}
                      <Link to="#" className="term-link">
                        Terms
                      </Link>
                    </Checkbox>
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="signIn rest-form-font"
                    type="primary"
                    size="large"
                    htmlType="submit"
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>

              <Paragraph className="rest-form-font already-text">
                Already have an account?{" "}
                <Link to="/login" className="rest-form-font signInColor">
                  Sign In
                </Link>
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

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
  );
};

export default Registeration;
