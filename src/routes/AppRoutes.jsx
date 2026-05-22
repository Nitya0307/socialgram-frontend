import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Signup from "../pages/signup";
import Createpost from "../pages/Createpost";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/create-post" element={<Createpost />} />

        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}