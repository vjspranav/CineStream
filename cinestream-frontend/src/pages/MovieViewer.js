import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Constants from "../Constants";
import { CineStreamContext } from "../App";

const MovieViewer = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState({
    purchased: false,
  });

  const { loggedIn, user } = useContext(CineStreamContext);
  //   const [url, setUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      let curUser = JSON.parse(localStorage.getItem("user"));

      await axios
        .get(Constants.BACKEND_URL + "/users/check-movie/" + id, {
          headers: { "x-access-token": curUser.token },
        })
        .then((res) => {
          setMovie(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    init();
  }, [id]);

  if (!loggedIn) {
    return <div className="movie-viewer">Please login to view this movie</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
      }}
    >
      {movie.purchased ? (
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <iframe
            width="100%"
            height="50%"
            src={movie.url}
            title="Movie"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
          <h1>{movie.name}</h1>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
          }}
        >
          <img
            src={"data:image/png;base64," + movie.thumbnail}
            alt={movie.name}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
          <h1>{movie.name}</h1>
          <h2>Buy this movie</h2>
          <button
            className="btn btn-primary"
            onClick={async () => {
              // create order
              await axios
                .post(
                  Constants.BACKEND_URL + "/users/create-order",
                  {
                    movieId: id,
                    amount: movie.cost * 100,
                  },
                  {
                    headers: { "x-access-token": user.token },
                  }
                )
                .then(async (res) => {
                  let payment = res.data;
                  //   We take payment id and run it through razor pay here and use the result
                  const paymentStatus = true;
                  // Now to update-payment
                  await axios
                    .post(
                      Constants.BACKEND_URL + "/users/update-payment",
                      {
                        paymentId: payment.paymentId,
                        status: paymentStatus,
                      },
                      {
                        headers: { "x-access-token": user.token },
                      }
                    )
                    .then(async (res) => {
                      let movie = res.data;
                      // Now to add-movie to user
                      await axios
                        .post(
                          Constants.BACKEND_URL + "/users/add-movie",
                          {
                            movieId: movie.movieId,
                          },
                          {
                            headers: { "x-access-token": user.token },
                          }
                        )
                        .then(async () => {
                          alert("Movie added to your library");
                          // sleep for 2 seconds
                          await new Promise((resolve) =>
                            setTimeout(resolve, 2000)
                          );
                          window.location.reload();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Buy - Rs {movie.cost}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieViewer;
