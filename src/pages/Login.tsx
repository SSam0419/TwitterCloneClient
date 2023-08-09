import React, { useState } from "react";
import LoginForm from "../components/Forms/LoginForm";
import GlobalPopUp from "../components/Common/GlobalPopUp";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <GlobalPopUp
      children={<LoginForm />}
      onClose={() => {
        navigate("/");
      }}
    />
  );
};

export default Login;
