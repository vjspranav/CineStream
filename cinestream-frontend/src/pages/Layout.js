import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "../components/Topbar";

// My pages
import Register from "./Register";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const Movies = () => {
  return <div>Movies</div>;
};

const Series = () => {
  return <div>Series</div>;
};

export default function Layout() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/series" component={<Series />} />
      </Routes>
    </BrowserRouter>
  );
}
