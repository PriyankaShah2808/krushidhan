const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const customerSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  pin_code: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  isBusiness:{
    type:Boolean,
    default:false
  }
});

//Export the model
module.exports = mongoose.model("Customer", customerSchema);
