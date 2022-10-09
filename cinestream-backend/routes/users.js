const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/users");

// Keys
const keys = require("../keys/prod");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // email and username should be unique
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (user) {
      if (user.email === req.body.email) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        return res.status(400).json({ username: "Username already exists" });
      }
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        fullName: req.body.fullName,
        movies: {},
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(201).json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  // Find user by email if not found by username
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  // Check if user exists
  if (!user) {
    return res.status(404).json({ usernotfound: "User not found" });
  }

  // Check password
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        username: user.username,
      };

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 604800, // 1 week in seconds
        },
        (err, token) => {
          user.token = token;

          user.save();

          res.status(200).json(user);
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  });
});

module.exports = router;
