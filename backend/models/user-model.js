const {Schema,model} =require('mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    cardData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const User = new model('User',userSchema);
module.exports = User;