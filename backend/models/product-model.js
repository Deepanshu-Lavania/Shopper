const {Schema, model } = require('mongoose');

const product = new Schema({
    id:{
        type:Number,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    new_price:{
        type:Number,
        require:true,
    },
    old_price:{
        type:Number,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    avilable:{
        type:Boolean,
        default:true,
    }
})

const Product = new model('Product',product);
module.exports = Product;