import React, { useState } from "react";
import "./index.scss";
import { Card } from "@arco-design/web-react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  const [registerState, setRegisterState] = useState(false);

  return (
    <div className="index-page">
      <Card
        className={`index-card-box ${
          registerState ? "register-box" : "login-box"
        }`}
      >
        {registerState ? (
          <RegisterForm setRegisterState={setRegisterState} />
        ) : (
          <LoginForm setRegisterState={setRegisterState} />
        )}
      </Card>
    </div>
  );
};
export default Login;
