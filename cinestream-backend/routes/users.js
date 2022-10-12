const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const auth = require("../middleware/auth");

// Load User model
const User = require("../models/users");
const Order = require("../models/orders");

// Keys
const keys = require("../keys/prod");
const urls = require("../keys/servers");

const getMovie = async (id) => {
  try {
    allOTT = urls.OTT_SERVERS;
    for (let i = 0; i < allOTT.length; i++) {
      const response = await axios.get(allOTT[i].url + "/");
      let data = response.data;
      if (id in data) {
        data[id].url = allOTT[i].url + "/video/" + id;
        return data[id];
      }
    }
  } catch (err) {
    console.log(err);
    return 500;
  }
  return false;
};

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

  if (!email && !username) {
    return res.status(400).json({ email: "Email or username is required" });
  }

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

// @route POST api/users/create-order
// @desc Create order
router.post("/create-order", auth, async (req, res) => {
  console.log(req.user.id);
  const id = req.user.id;
  const movieId = req.body.movieId;
  const paymentId = "NA";
  const amount = req.body.amount;

  const order = new Order({
    userId: id,
    movieId: movieId,
    paymentId: paymentId,
    paid: false,
  });

  // RAZORPAY_SERVER_URL is the url of the razorpay server
  const RAZORPAY_SERVER_URL = urls.RAZORPAY_SERVER_URL;
  console.log(RAZORPAY_SERVER_URL);
  axios
    .post(
      RAZORPAY_SERVER_URL + "/create_order",
      {
        amount: amount,
      },
      {
        headers: {
          rp_key_id: keys.razorpay.key_id,
          rp_key_secret: keys.razorpay.key_secret,
        },
      }
    )
    .then((response) => {
      console.log(order);
      order.paymentId = response.data.id;
      // order.id = req.user._id;
      order.save().then((order) => {
        // Add order to user
        User.findOneAndUpdate(
          { _id: id },
          { $push: { orders: order._id } },
          { new: true }
        ).then(() => {
          res.status(200).json(order);
        });
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      res.status(400).json(error);
    });
});

// Update payment status
router.post("/update-payment", auth, async (req, res) => {
  const id = req.user.id;
  const paymentId = req.body.paymentId;
  const status = req.body.status;

  const order = await Order.findOne({ paymentId: paymentId });

  if (order) {
    if (id === order.userId) {
      order.paid = status || order.paid;
      order.save().then((order) => {
        // Add payment to user
        User.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              payments: {
                paymentId: paymentId,
                paid: status,
                orderId: order._id,
              },
            },
          },
          { new: true }
        ).then(() => {
          res.status(200).json(order);
        });
      });
    } else {
      res.status(400).json({ error: "User not authorized" });
    }
  } else {
    res.status(400).json({ error: "Order not found" });
  }
});

// @route POST add movie to user
// @desc Add movie to user
router.post("/add-movie", auth, async (req, res) => {
  const id = req.user.id;
  const movieId = req.body.movieId;

  const orders = await Order.find({
    userId: id,
    movieId: movieId,
  });
  console.log(orders);
  if (orders.length > 0) {
    console.log(orders);
    // Check if at least one order is paid
    const paid = orders.some((order) => order.paid === true);
    // Add movieId to user
    if (paid) {
      User.findOneAndUpdate(
        { _id: id },
        { $push: { movies: movieId } },
        { new: true }
      ).then((user) => {
        res.status(200).json(user);
      });
    } else {
      res.status(400).json({ error: "Movie not paid" });
    }
  } else {
    res.status(400).json({ error: "Movie not purchased" });
  }
});

// get request to check if a movie is purchased by the user
router.get("/check-movie/:movieId", auth, async (req, res) => {
  const id = req.user.id;
  const movieId = req.params.movieId;

  const movie = await getMovie(movieId);

  if (movie === 500) {
    return res.status(500).json({ error: "Internal server error" });
  } else if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const orders = await Order.find({
    userId: id,
    movieId: movieId,
    paid: true,
  });

  if (orders.length > 0) {
    return res.status(200).json({ purchased: true, ...movie });
  } else {
    return res.status(200).json({ purchased: false, ...movie });
  }
});

module.exports = router;
