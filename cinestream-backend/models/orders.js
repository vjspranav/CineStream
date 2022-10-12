const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a order schema
// It has
// - user id
// - movie id
// - order id
// - payment id

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("orders", orderSchema);
