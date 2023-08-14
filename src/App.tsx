import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";
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
        <Route index path="/home" element={<Home />} />
        <Route path="/sign_in" element={<Login />} />
      </Route>
    </Routes>
  );
}
