import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Orders from "./Pages/Orders";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";

// Main routing component - sets up all app routes
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
