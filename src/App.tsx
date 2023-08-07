import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}
