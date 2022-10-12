const ffmpeg = require("fluent-ffmpeg");

movies = [
  "Pexels Videos 4516.mp4",
  "Pexels Videos 4098.mp4",
  "video.mp4",
  "video (1).mp4",
  "pexels-taryn-elliott-5220298.mp4",
];

movies.forEach((movie) => {
  ffmpeg("Movies/" + movie).screenshots({
    count: 1,
    filename: movie + ".png",
    folder: "Movies/thumbnails",
    // size: '320x240'
  });
});
