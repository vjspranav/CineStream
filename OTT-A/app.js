const express = require("express");
// const router = express.Router();
const fs = require("fs");

const indexRouter = require("./routes/index");
const cors = require("cors");
const port = 3002;
const app = express();

app.use(cors());

app.use("/images", express.static("Movies/images"));
app.use("/thumbnails", express.static("Movies/thumbnails"));
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`OTT-A listening on port ${port}`);
});

module.exports = app;
