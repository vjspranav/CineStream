const express = require("express");
const auth = require("../middleware/auth");
const axios = require("axios");

const router = express.Router();
const urls = require("../keys/servers");

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
  try {
    allOTT = urls.OTT_SERVERS;
    for (let i = 0; i < allOTT.length; i++) {
      const response = await axios.get(allOTT[i].url + "/");
      let data = response.data;
      if (movieId in data) {
        return res.status(200).json(data[movieId]);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(400).json({ error: "Movie not found" });
});

module.exports = router;
