const express = require("express");
// const router = express.Router();

const indexRouter = require("./routes/index");
const cors = require("cors");
const port = 3002;
const app = express();

app.use("/", indexRouter);
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
