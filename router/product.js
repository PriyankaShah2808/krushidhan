const { json } = require("express");
const express = require("express");
//const product = require("../model/product");
const router = express.Router();
const Product = require("../model/product");



//Add Product
router.post("/addProduct/:id", async (req, res) => {
  try {
    const { prod_name, prod_description, price, isAvailable } = req.body;

    const seller = await Product.findById({ _id: req.params.id });

    if (!seller) {
      const _product = new Product({
        _id: req.params.id,
        product: [
          {
            prod_name,
            prod_description,
            price,
            isAvailable,
          },
        ],
      });
      _product.save((err, _product) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Product Not Added!", error: err.message ,status:false});
        }
        return res
          .status(201)
          .json({ message: "Product Added Successfully!", status: true });
      });
    } else {
      seller.product = [
        ...seller.product,
        {
          prod_name,
          prod_description,
          price,
        },
      ];
      const updateData = await seller.save();
      res
        //.send(updateData)
        .status(201)
        .json({ message: "Product Added Successfully!", status: true });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ error: err.message, message: "Product Not Added!",status:false });
  }
});





//getting details of all product
router.get("/view", async (req, res) => {
  const product = await Product.find();
  res.status(200).send(product);
});





//Product Description by Product id
router.get("/prodDescription/:_id", async (req, res) => {
    try{
        const a = await Product.findOne({product:{$elemMatch:{_id:req.params._id}}});
        if(a)
        {  
            const result = a.product.filter(p => p._id == req.params._id)
            res.json(result);
        }
        else{
            return res.send("product not found");
        }
    }
    catch (err) {
        return res
          .status(401)
          .json({ error: err.message, message: "Product Not found!",status:false });
      }
});



// Search product by product name
router.get("/search/:prod_name", async (req, res) => {
  let a = await Product.find();
  let pr = [];
  //console.log(JSON.stringify(a, "", 4));
  a.forEach((e) => {
    const { product } = e;
    const p = product.filter((prod) =>
      prod.prod_name.includes(req.params.prod_name)
    );
    pr.push(...p)
  });
  if(!pr)
    res.send("product not found");
  else
   res.json(pr).send("product Found");
  
});

module.exports = router;
