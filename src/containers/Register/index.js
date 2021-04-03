import Lateral from "@components/FormLateral/Lateral";
import React from "react";
import RegisterForm from "./components/Form";

export function Register() {
  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <Lateral title="Registrase" description="Ingrese los datos correspondientes para poder iniciar sesión" />
          <div className="gx-app-login-content">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
