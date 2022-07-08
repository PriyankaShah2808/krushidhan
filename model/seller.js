const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const sellerSchema = new mongoose.Schema({
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: Number,
    required: true,
  },
  aadhar_number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  kissan_card: {
    type: String,
    required: true,
  },
  pin_codes: {
    type: Array,
    min: 100000,
    max: 999999,
    required: true,
  },
  address: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Seller", sellerSchema);
