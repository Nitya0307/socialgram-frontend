import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Signup from "../pages/signup";
import Createpost from "../pages/Createpost";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
  path="/create-post"
  element={
    <ProtectedRoute>
      <Createpost />
    </ProtectedRoute>
  }
/>


<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}