const Product = require('../models/product-model')

const newCollection = async(req,res)=>{
    let products = await Product.find({})
    // let newCollection = products.slice(-1,-9); It will provide empty data
    // let newCollection = products.slice(-9,-1); It will provide data from the last index -9 but except -1 index means give elements from 2nd last
    // let newCollection = products.slice(1).slice(-8) firstly remove first element then take last 8 elements from last
    let newCollections = products.slice(-8)
    console.log("NewCollection Fetched : ",newCollections);
    res.send(newCollections);
}
const  popularInwomen = async(req,res)=>{
    let products = await Product.find({ category: 'women' });
    let popularInwomens = products.slice(0,4)
    console.log("popularInwomens Fetched : ",popularInwomens);
    res.send(popularInwomens);
}
module.exports = {newCollection, popularInwomen}