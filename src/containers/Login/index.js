import Lateral from "@components/FormLateral/Lateral";
import React from "react";
import LoginForm from "./components/Form";

export function Login() {
  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <Lateral title="Ingresar" description="Debe haberse registrado previamente" />
          <div className="gx-app-login-content">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
