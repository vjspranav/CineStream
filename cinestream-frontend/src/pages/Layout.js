import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Home from "./Home";
import MovieViewer from "./MovieViewer";

// My pages
import Register from "./Register";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect((
  ) => {
    setInterval(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return <h1>Page Not Found! Redirecting...</h1>;
};

export default function Layout() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movieViewer/:id" element={<MovieViewer />} />
        <Route exact path="/register" element={<Register />} />
        {/* Else redirect home */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
