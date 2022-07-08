const mongoose = require("mongoose");
const Seller = require("../model/seller").Seller;
//const Customer = require("../customer");

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  product: [
    {
      prod_name: {
        type: String,
        required: true,
      },

      prod_description: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      isAvailable: {
        type: Boolean,
        default: true,
      },

      Date: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
