import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import GlobalPopUp from "../components/Common/GlobalPopUp";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { LoginPageStatus } from "../redux/slices/authSlicer";

const Login = () => {
  const { loginStatus } = useAppSelector((state) => ({
    loginStatus: state.auth.loginPageStatus,
  }));
  const navigate = useNavigate();
  useEffect(() => {
    if (loginStatus == LoginPageStatus.LoginSuccessful) {
      navigate("/profile");
    }
  }, []);

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
