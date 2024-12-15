const Product = require("../models/product-model");

const newCollection = async (req, res) => {
  let products = await Product.find({});
  // let newCollection = products.slice(-1,-9); It will provide empty data
  // let newCollection = products.slice(-9,-1); It will provide data from the last index -9 but except -1 index means give elements from 2nd last
  // let newCollection = products.slice(1).slice(-8) firstly remove first element then take last 8 elements from last
  let newCollections = products.slice(-8);
  console.log("NewCollection Fetched : ", newCollections);
  res.send(newCollections);
};
const popularInwomen = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularInwomens = products.slice(0, 4);
  console.log("popularInwomens Fetched : ", popularInwomens);
  res.send(popularInwomens);
};
/* const  relatedProduct = async(req,res)=>{
    console.log("req.body.category for relatedProduct ",req.body.category);
    let products = await Product.find({ category:req.body.category});
    let relatedproduct = products.slice(0,4)
    console.log("relatedProduct Fetched : ",relatedproduct);
    res.send(relatedproduct);
} */
const relatedProduct = async (req, res) => {
  try {
    const { category } = req.body; // Extract the category from the request body
    console.log("req.body.category for relatedProduct: ", category);
    if (!category) {
      return res.status(400).send({ message: "Category is required." });
    }
    // Find products by category
    const products = await Product.find({ category:category });
    const relatedProducts = products.slice(0, 4); // Limit to 4 related products

    console.log("Related Products Fetched: ", relatedProducts);
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = { newCollection, popularInwomen, relatedProduct };
