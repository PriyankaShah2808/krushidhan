const jwt = require("jsonwebtoken");
const Seller = require("../model/seller");
const Customer = require("../model/customer");

// authenticates user before accessing specified route
const protectRoute = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
     
      const token = req.headers.authorization.split(" ")[1];
     
      if (token) {
     
        const decoded = jwt.verify(token, "secret@@123");
     
        req.user = await Seller.findById(decoded.id).select("-password");
        req.cust = await Customer.findById(decoded.id).select("-password");


        next();
      } else {
        res.status(401).json({ message: "Unauthorised Access Login Now!" });
      }
    } catch (err) {
      console.error(err.message); 
    }
  }
  else{
    return res.status(401).json({ message: "Unathorised Access" });
  }
};

module.exports = protectRoute;

