const express = require("express");
const {home, product, remove, getProduct} = require("../controllers/product-controller");
const router = express.Router();

//creating API
router.get("/",home)
router.post("/addproduct",product)
router.post("/removeproduct",remove)
router.get("/getallproduct",getProduct)

module.exports = router;