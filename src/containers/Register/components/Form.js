import React from "react";
import Link from "next/link";
import { Button, Divider, Form, Input, Spin } from "antd";
import { registerStart } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function RegisterForm() {
  const { settings } = useSelector((store) => store);
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    dispatch(registerStart(values));
  };

  return (
    <Spin spinning={settings.loader}>
      <Form
        initialValues={{ email: "pedro@test.com", password: "123456", firstname: "Pedro", lastname: "Fuentes", phoneNumber: "+584128899502" }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="gx-signin-form gx-form-row0"
      >
        <Form.Item rules={[{ required: true, message: "Ingrese un nombre" }]} name="firstname">
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Ingrese un apellido" }]} name="lastname">
          <Input placeholder="Apellido" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Ingrese un número de teléfono" }]} name="phoneNumber">
          <Input placeholder="Número de teléfono" />
        </Form.Item>
        <Divider dashed />
        <Form.Item rules={[{ required: true, type: "email", message: "Este no es un correo válido" }]} name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]} name="password">
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="gx-mb-0" htmlType="submit">
            Registrarse
          </Button>
          <span>ó</span>{" "}
          <Link href="/login">
            <a>Iniciar sesión</a>
          </Link>
        </Form.Item>
        <span className="gx-text-light gx-fs-sm"> </span>
      </Form>
    </Spin>
  );
}
export default RegisterForm;
