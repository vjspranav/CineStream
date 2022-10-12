const express = require("express");
const auth = require("../middleware/auth");
const axios = require("axios");

const router = express.Router();
const urls = require("../keys/servers");

const getMovie = async (id) => {
  try {
    allOTT = urls.OTT_SERVERS;
    for (let i = 0; i < allOTT.length; i++) {
      const response = await axios.get(allOTT[i].url + "/");
      let data = response.data;
      if (id in data) {
        data[id].url = allOTT[i].url + "/video/" + id;
        return data[id];
      }
    }
  } catch (err) {
    console.log(err);
    return 500;
  }
  return false;
};

/* GET home page. */
router.get("/", auth, function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

/** Get request to check if online
 * @route GET api/service-status
 * @access Public
 */
router.get("/service-status", (req, res) => {
  res.status(200).json({ status: "online" });
});

// Send all movies of all platforms
router.get("/all-content", async (req, res) => {
  data = {};
  try {
    allOTT = urls.OTT_SERVERS;
    for (let i = 0; i < allOTT.length; i++) {
      const response = await axios.get(allOTT[i].url + "/");
      data[allOTT[i].name] = response.data;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

  res.status(200).json(data);
});

// Send a particular movie
router.get("/movie/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await getMovie(movieId);
  if (movie) {
    return res.status(200).json(movie);
  } else if (movie === 500) {
    return res.status(500).json({ error: "Internal Server Error" });
  } else {
    return res.status(400).json({ error: "Movie not found" });
  }
});

module.exports = router;
