import React, { useState } from "react";
import "./index.scss";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  const [registerState, setRegisterState] = useState(false);

  return (
    <div className="index-page">
      {registerState ? (
        <RegisterForm setRegisterState={setRegisterState} />
      ) : (
        <LoginForm setRegisterState={setRegisterState} />
      )}
    </div>
  );
};
export default Login;
