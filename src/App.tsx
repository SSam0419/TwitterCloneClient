import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="/home" element={<Home />} />
        <Route path="/sign_in" element={<Login />} />
      </Route>
    </Routes>
  );
}
