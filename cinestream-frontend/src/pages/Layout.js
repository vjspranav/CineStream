import { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";

import Home from "./Home";
import MovieViewer from "./MovieViewer";

// My pages
import Register from "./Register";

const Footer = () => {
  return (
    <Navbar
      position="bottom"
      bg="dark"
      variant="dark"
      expand="lg"
      style={{
        height: "40px",
      }}
    >
      <Container fluid>
        <Navbar.Brand
          href="https://github.com/vjspranav/Cinestream"
          target="_blank"
          style={{
            fontSize: "15px",
          }}
        >
          CopyRight &copy; 2021 CineStream
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
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
      <Footer />
    </BrowserRouter>
  );
}
