const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;

//mongo db connection
mongoose.connect("mongodb://dbuser:dbuser@krushidhan-shard-00-00.3nukz.mongodb.net:27017,krushidhan-shard-00-01.3nukz.mongodb.net:27017,krushidhan-shard-00-02.3nukz.mongodb.net:27017/?ssl=true&replicaSet=atlas-qg3h0j-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Database Connected');
}).catch( (err) => {
    console.log('Database Not Connected' + err);
});
console.log("Welcome to krushidhan App!!!");

// import routes

const sellerRouter = require("./router/seller");
const customerRouter = require("./router/customer");
const productRouter = require("./router/product");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
   res.json({message:"Server Is Running!!"}) 
});

app.use("/seller", sellerRouter);
app.use("/customer",customerRouter);
app.use("/product",productRouter);


app.listen(port, () => {
    console.log(`Server Running on ${port}`);
});
