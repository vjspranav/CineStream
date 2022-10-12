const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

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

module.exports = router;
