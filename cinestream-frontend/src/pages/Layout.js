import { BrowserRouter, Route, Routes } from "react-router-dom";

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
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/series" component={<Series />} />
      </Routes>
    </BrowserRouter>
  );
}
