import Lateral from "@components/FormLateral/Lateral";
import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./components/Form";

export function Login() {
  const storage = useSelector((store) => store);
  console.log("🚀 ~ file: index.js ~ line 8 ~ Login ~ storage", storage);
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
