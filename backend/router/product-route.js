const express = require("express");
const router = express.Router();
const {home, product, remove, getProduct} = require("../controllers/product-controller");

//creating API
router.get("/",home)
router.post("/addproduct",product)
router.post("/removeproduct",remove)
router.get("/getallproduct",getProduct)

module.exports = router;