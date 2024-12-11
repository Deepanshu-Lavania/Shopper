const Product = require("../models/product-model");

const home = (req, res) => {
  res.send("Hello World!");
};

const product = async (req, res) => {
  // console.log("req.body is  ",req.body);
  
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      // Get the last product and derive the new ID
      const lastProduct = products[products.length - 1];
      id = lastProduct.id + 1;
    } else {
      id = 1; // Start from 1 if no products exist
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    // Save the product to the database
    await product.save();
    console.log("Product saved  :", product);
    //send response to frontend
    res.json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const remove = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Validate that ID is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }
  
      // Delete the product with the specified ID
      const deletedProduct = await Product.findOneAndDelete({ id });
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      console.log("Product removed:", deletedProduct);
      res.json({
        success: true,
        message: "Product removed successfully!",
        product: deletedProduct,
      });
    } catch (error) {
      console.error("Error removing product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove product",
        error: error.message,
      });
    }
  };
  
const getProduct = async(req,res)=>{
    try {
        let products= await Product.find({});
        res.json({
            success: true,
            message: "Product get successfully!",
            product: products,
          });

    } catch (error) {
        console.error("Error to getting all product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get product",
        error: error.message,
      });
    }
}
module.exports = { home, product, remove , getProduct};
