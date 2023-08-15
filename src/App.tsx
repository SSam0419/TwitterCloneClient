import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MainLayout from "./Layout/MainLayout";
import { useAppDispatch } from "./redux/store";
import { useEffect } from "react";
import { verifyAccesToken } from "./redux/actions/authAction";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyAccesToken());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/sign_in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
