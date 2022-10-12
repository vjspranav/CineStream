const express = require("express");
// const auth = require("../middleware/auth");
const videos = require("../content");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(videos);
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
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
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
