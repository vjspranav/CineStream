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
      if (loggedIn) {
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
      }
    };
    init();
  }, [id, loggedIn]);

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
            src={movie.otturl + "/thumbnails/" + movie.name + ".png"}
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
                  console.log(payment);
                  const order = payment.paymentId;
                  const options = {
                    key: "rzp_test_FR7wXHov7weZoB", // Enter the Key ID generated from the Dashboard
                    amount: movie.cost, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: "Cine Stream",
                    description: "Purchasing " + movie.name,
                    order_id: order, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
                    prefill: {
                      name: user.name,
                      email: user.email,
                    },
                    notes: {
                      address: "Razorpay Corporate Office",
                    },
                    theme: {
                      color: "#3399cc",
                    },
                    handler: async (response) => {
                      console.log(response);
                      let paymentStatus = true;
                      alert("Payment successful");
                      // const paymentStatus = true;
                      // Now to update-payment
                      await axios
                        .post(
                          Constants.BACKEND_URL + "/users/update-payment",
                          {
                            paymentId: payment.paymentId,
                            status: paymentStatus,
                          },
                          {
                            headers: {
                              "x-access-token": user.token,
                            },
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
                                headers: {
                                  "x-access-token": user.token,
                                },
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
                    },
                  };
                  const rzp1 = new window.Razorpay(options);
                  rzp1.open();
                  rzp1.on("payment.failed", async function (response) {
                    console.log(response);
                    alert("Payment failed");
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
