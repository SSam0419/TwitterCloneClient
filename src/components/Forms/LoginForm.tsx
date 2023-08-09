import React, { useEffect, useState } from "react";
import { registerUser } from "../../api/AuthApi";
import { useAppSelector } from "../../redux/store";
import { LoginPageStatus } from "../../redux/slices/authSlicer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { loginStatus, error } = useAppSelector((state) => ({
    loginStatus: state.auth.loginPageStatus,
    error: state.auth.error,
  }));

  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    switch (loginStatus) {
      case LoginPageStatus.LoginSuccessful:
        setHint("Login Successful!");
        navigate("/home");
        break;
      case LoginPageStatus.LoginFailed:
        setHint(`Login Failed : ${error}`);
        break;
      case LoginPageStatus.RegisterSuccessful:
        setHint("Register Successful! Login Now!");
        break;
      case LoginPageStatus.RegisterFailed:
        setHint(`Register Failed : ${error}`);
        break;
      default:
        setHint("");
        break;
    }
  }, [loginStatus]);

  const floatingStyle = `absolute left-0 -top-3.5 
                      text-gray-600 
                      text-sm 
                      transition-all 
                      peer-placeholder-shown:text-base 
                      peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-2
                      peer-focus:-top-3.5
                      peer-focus:text-gray-600 
                      peer-focus:text-sm `;
  const inputStyle = `peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none ${
    isRegistering ? "focus:border-rose-600 " : "focus:border-blue-600"
  }`;

  return (
    <div className="">
      <div
        className={`selection:${
          isRegistering ? "bg-rose-500" : "bg-blue-500"
        } selection:text-white`}
      >
        <div
          className={`min-h-screen ${
            isRegistering ? "bg-rose-100" : "bg-blue-100"
          } selection:text-white flex justify-center items-center`}
        >
          <div className="p-8 flex-1">
            <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
              <div
                className={`relative h-48 ${
                  isRegistering ? "bg-rose-500" : "bg-blue-500"
                } rounded-bl-4xl`}
              >
                <svg
                  className="absolute bottom-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#ffffff"
                    fill-opacity="1"
                    d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {isRegistering ? "Join Us!" : "Welcome back!"}
                </h1>
                <form
                  className="mt-12"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    if (confirmPassword != password) {
                      return;
                    }
                    if (isRegistering) {
                      console.log({ username: username, password: password });
                      registerUser({ username: username, password: password });
                    }
                  }}
                >
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className={inputStyle}
                      placeholder="Email address"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="email" className={floatingStyle}>
                      Email address
                    </label>
                  </div>
                  <div className="mt-10 relative">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className={inputStyle}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className={floatingStyle}>
                      Password
                    </label>
                  </div>
                  {isRegistering && (
                    <div className="mt-10 relative">
                      <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        className={inputStyle}
                        placeholder="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label
                        htmlFor="confirmPassword"
                        className={floatingStyle}
                      >
                        Confirm Password
                      </label>
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`mt-20 px-4 py-2 rounded ${
                      isRegistering
                        ? "bg-rose-500 hover:bg-rose-400"
                        : "bg-blue-500 hover:bg-blue-400"
                    } text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 ${
                      isRegistering
                        ? "focus:ring-rose-500"
                        : "focus:ring-blue-500"
                    } focus:ring-opacity-80 cursor-pointer`}
                  >
                    {isRegistering ? "Create Account" : "Sign in"}
                  </button>
                </form>
                <div>{hint}</div>
                <button
                  onClick={() => {
                    setIsRegistering((prev) => !prev);
                  }}
                  className={`mt-4 block text-sm text-center font-medium ${
                    isRegistering ? "text-rose-600" : "text-blue-600"
                  } hover:underline focus:outline-none focus:ring-2 ${"isRegistering ? focus:ring-rose-500 :focus:ring-blue-500"}`}
                >
                  {isRegistering ? "Login now!" : "Don't have an acount yet?"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
