import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ContentScroller from "../components/ContentScroller";
import content from "./content.json";

const Home = () => {
  // Set interval run every 5 seconds
  const [index, setIndex] = useState(0);

  return (
    <div className="home">
      <div className="home-carousel">
        <Carousel fade activeIndex={index} onSelect={setIndex}>
          {Object.values(content).map((item) => (
            <Carousel.Item>
              <img
                img-responsive
                className="d-block"
                src={"data:image/png;base64," + item.thumbnail}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
              <Carousel.Caption>
                <h3>{item.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="home-content">
        <h2>OTT-A</h2>
        <ContentScroller data={content} />
      </div>
      <div className="home-content">
        <h2>OTT-A</h2>
        <ContentScroller data={Object.values(content).slice(0, 5)} />
      </div>
    </div>
  );
};

export default Home;
