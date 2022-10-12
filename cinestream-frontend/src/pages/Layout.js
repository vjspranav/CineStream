import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "../components/Topbar";
import Home from "./Home";

// My pages
import Register from "./Register";

export default function Layout() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
