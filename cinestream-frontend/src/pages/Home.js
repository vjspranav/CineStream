import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
// import { useNavigate } from "react-router-dom";
import { SpinnerInfinity } from "spinners-react";
import ContentScroller from "../components/ContentScroller";
import Constants from "../Constants";
import axios from "axios";

const Home = () => {
  // Set interval run every 5 seconds
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();
  const [data, setData] = useState({});
  const [content, setContent] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  useEffect(() => {
    const setImages = (content) => {
      // for each content do a get request to content.url/video-details/id
      // add thumbnail to content

      let tempContent = content;
      for (let i in tempContent) {
        axios
          .get(tempContent[i].url + "/video-details/" + tempContent[i].id)
          .then((res) => {
            console.log(res.data);
            // tempContent[i].thumbnail = res.data.thumbnail;
            setThumbnails((prev) => {
              return { ...prev, [tempContent[i].id]: res.data.thumbnail };
            });
          });
      }
      setContent(tempContent);
      console.log(tempContent);
    };

    const init = async () => {
      await axios.get(Constants.BACKEND_URL + "/all-content").then((res) => {
        console.log(res.data);
        let data = res.data;
        setData(data);
        let tempContent = [];
        for (let i in data) {
          let tempAllContent = Object.values(data[i]);
          // Add i to each object
          tempAllContent = tempAllContent.map((obj) => {
            return obj;
          });
          tempContent = [...tempContent, ...tempAllContent];
        }
        console.log(tempContent);
        setContent(tempContent);
        setLoading(false);
        setImages(tempContent);
      });
    };

    init();
  }, []);

  const Loader = (
    <SpinnerInfinity
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      size={100}
      thickness={120}
      speed={83}
      color="rgba(57, 172, 163, 1)"
      secondaryColor="rgba(57, 115, 172, 0.44)"
    />
  );

  const Home = (
    <div className="home">
      <div className="home-carousel">
        <Carousel fade activeIndex={index} onSelect={setIndex}>
          {content.map((item) => (
            <Carousel.Item
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = item.url + "/movieViewer/" + item.id;
              }}
            >
              <img
                img-responsive={1}
                className="d-block"
                src={
                  thumbnails[item.id]
                    ? "data:image/png;base64," + thumbnails[item.id]
                    : "https://img.freepik.com/premium-vector/progress-bar-doodle-sketch-style-loading-icon-image-hand-drawn-vector-illustration_356415-1238.jpg"
                }
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
      {Object.keys(data).map((key) => {
        return (
          <div key={key}>
            <h2
              style={{
                marginLeft: "10px",
              }}
            >
              {key}
            </h2>
            <ContentScroller data={data[key]} thumbnails={thumbnails} />
          </div>
        );
      })}
    </div>
  );
  return loading ? Loader : Home;
};

export default Home;
