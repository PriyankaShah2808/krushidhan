const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const protectRoute = require("../middleware/auth");

//customer model import
const Customer = require("../model/customer");
//const seller = require("../model/seller");

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
      password,
      pin_code,
      address,
      isBusiness,
    } = req.body;
    const customer_exist = await Customer.findOne({ email_id: email_id });
    if (customer_exist) {
      return res.status(401).json({ message: "Customer Already Exist!!" ,status: false});
    }
    
    // if(password !== confirm_password) {
    //     return res.status(401).json({ message: "Password Not Match!!" });
    // }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const customer = new Customer({
      email_id: email_id,
      first_name: first_name,
      last_name: last_name,
      mobile_number: mobile_number,
      password: hashPassword,
      pin_code: pin_code,
      address: address,
      isBusiness: isBusiness
    });

    customer.save((err, customer) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Customer Not Registered!", error: err.message });
      }
      return res.status(201).json({ message: "Customer Register Successfully!" ,status: true});
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
    //console.log("email_id "+email_id);
    if (!email_id || !password) {
      return res
        .status(401)
        .json({ message: "Please Enter Valid Email and Password!" ,status: false});
    }

    const customer = await Customer.findOne({ email_id: email_id });
    if (!customer) {
      return res.status(401).json({ message: "Invalid Email or Password!!" ,status: false});
    }
    let isMatch = bcrypt.compareSync(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password!!" ,status: false});
    }

    if (customer && isMatch) {
      res.status(201).json({
        email_id: customer.email_id,
        token: generateToken(customer._id),
        status:true,
        message: "Login Successfull!!!"
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password",status: false});
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/view", async (req, res) => {
   const customer = await Customer.find();
   res.status(200).send(customer);
  //res.status(200).send({status:true});
});


//get customer id by details
router.get("/view/:id",protectRoute, async (req, res) => {
  //const _id = req.params;
  console.log(req.cust);
  const customer = await Customer.find({_id:req.params._id});
  res.status(200).json(req.cust);
});


module.exports = router;
