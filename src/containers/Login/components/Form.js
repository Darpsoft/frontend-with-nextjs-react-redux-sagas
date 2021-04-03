import React from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input, Row, Spin } from "antd";
import { loginStart } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function LoginForm() {
  const { settings } = useSelector((store) => store);
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = ({ remember, ...values }) => {
    dispatch(loginStart(values));
  };

  return (
    <Spin spinning={settings.loader}>
      <Form
        initialValues={{ email: "testapis@tuten.cl", password: "1234" }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="gx-signin-form gx-form-row0"
      >
        <Form.Item rules={[{ required: true, type: "email", message: "Este no es un correo válido" }]} name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]} name="password">
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="gx-mb-0" htmlType="submit">
            Ingresar
          </Button>
          <span>ó</span>{" "}
          <Link href="/register">
            <a>Registrame</a>
          </Link>
        </Form.Item>
        <span className="gx-text-light gx-fs-sm"> </span>
      </Form>
    </Spin>
  );
}
export default LoginForm;
