const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

/* GET home page. */
router.get("/", auth, function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

module.exports = router;
