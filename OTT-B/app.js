const express = require("express");
// const router = express.Router();

const indexRouter = require("./routes/index");
const cors = require("cors");
const port = 3003;
const app = express();

app.use(cors());
app.use("/thumbnails", express.static(__dirname + "/Movies/thumbnails"));
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`OTT-B listening on port ${port}`);
});

module.exports = app;
