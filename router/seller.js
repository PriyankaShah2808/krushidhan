const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

//seller model import
const Seller = require("../model/seller");

// generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, "secret@@123", {
    expiresIn: "36h",
  });
};

// Register
router.post("/register", async (req, res) => {
  try {
    const {
      email_id,
      first_name,
      last_name,
      mobile_number,
      aadhar_number,
      password,
      kissan_card,
      pin_codes,
      address,
    } = req.body;
    const seller_exist = await Seller.findOne({ email_id: email_id });
    if (seller_exist) {
      return res.status(401).json({ message: "Seller Already Exist!!" });
    }
    
    // if(password !== confirm_password) {
    //     return res.status(401).json({ message: "Password Not Match!!" });
    // }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const seller = new Seller({
      email_id: email_id,
      first_name: first_name,
      last_name: last_name,
      mobile_number: mobile_number,
      aadhar_number: aadhar_number,
      password: hashPassword,
      kissan_card: kissan_card,
      pin_codes: pin_codes,
      address: address,
    });

    seller.save((err, seller) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Seller Not Registered!", error: err.message });
      }
      return res.status(201).json({ message: "Seller Register Successfully!" });
    });
  } catch (err) {
    return res.status(401).json(err.message);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { email_id, password } = req.body;
    // if email and password not exist
    if (!email_id || !password) {
      return res
        .status(401)
        .json({ message: "Enter Valid Email and Password!" });
    }

    const seller = await Seller.findOne({ email_id: email_id });

    if (!seller) {
      return res.status(401).json({ message: "Invalid Email or Password!!" });
    }

    let isMatch = bcrypt.compareSync(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password!!" });
    }

    if (seller && isMatch) {
      res.status(201).json({
        email_id: seller.email_id,
        token: generateToken(seller._id),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/view", async (req, res) => {
  const seller= await Seller.find();
  res.status(200).send(seller);
});


module.exports = router;
