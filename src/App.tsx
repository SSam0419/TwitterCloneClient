import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/tweets" />
      </Route>
    </Routes>
  );
}
