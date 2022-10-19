const express = require("express");
// const auth = require("../middleware/auth");
const videos = require("../content");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  // Remove thumbnail from each video
  // videos is an object
  const videosWithoutThumbnails = Object.keys(videos).reduce((acc, key) => {
    const { thumbnail, ...video } = videos[key];
    acc[key] = video;
    return acc;
  }, {});
  res.send(videosWithoutThumbnails);
});

router.get("/video-details/:id", (req, res) => {
  const video = videos[req.params.id];
  if (!video) {
    return res.status(404).send("The video with the given ID was not found.");
  }
  res.send(video);
});

/** Get request to check if online
 * @route GET api/service-status
 * @access Public
 */
router.get("/service-status", (req, res) => {
  res.status(200).json({ status: "online" });
});

router.get("/video/:id", (req, res) => {
  const id = req.params.id;
  const videoPath = `Movies/${videos[id].name}`;
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;
  const videoRange = req.headers.range;
  if (videoRange) {
    const parts = videoRange.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : Math.min(start + 10 ** 6, fileSize - 1);
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const header = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, header);
    file.pipe(res);
  } else {
    const header = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, header);
    fs.createReadStream(videoPath).pipe(res);
  }
});

module.exports = router;
