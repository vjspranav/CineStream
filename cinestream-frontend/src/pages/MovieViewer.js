import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Constants from "../Constants";

const MovieViewer = () => {
  let { id } = useParams();
  const [owned, setOwned] = useState(false);
  //   const [url, setUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      let curUser = JSON.parse(localStorage.getItem("user"));

      await axios
        .get(Constants.BACKEND_URL + "/users/check-movie/" + id, {
          headers: { "x-access-token": curUser.token },
        })
        .then((res) => {
          setOwned(res.data.purchased);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    init();
  }, [id]);

  return (
    // if owned is true, show the video in an iframe
    // Else show a button to buy the video
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
      }}
    >
      {owned ? (
        <iframe
          width="100%"
          height="50%"
          src={"http://localhost:3002/video/" + id}
          title="Movie"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      ) : (
        <div>
          <h1>Buy this movie</h1>
          <button className="btn btn-primary">Buy</button>
        </div>
      )}
    </div>
  );
};

export default MovieViewer;
