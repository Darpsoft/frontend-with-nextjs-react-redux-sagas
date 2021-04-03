import React from "react";
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
    console.log("🚀 ~ file: Form.js ~ line 14 ~ onFinish ~ remember", remember);
    dispatch(loginStart(values));
  };

  return (
    <Spin spinning={settings.loader}>
      <Form
        initialValues={{ user: "testapi@tuten.cl", pass: "1234" }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="gx-signin-form gx-form-row0"
      >
        <Form.Item rules={[{ required: true, type: "email", message: "Este no es un correo válido" }]} name="user">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]} name="pass">
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Recordar</Checkbox>
            </Form.Item>
            <Form.Item>
              <a className="gx-login-form-forgot" href="/forgot-password">
                Olvidé contraseña
              </a>
            </Form.Item>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="gx-mb-0" htmlType="submit">
            Ingresar
          </Button>
          <span>ó</span> <a href="/register">Registrame</a>
        </Form.Item>
        <span className="gx-text-light gx-fs-sm"> </span>
      </Form>
    </Spin>
  );
}
export default LoginForm;
