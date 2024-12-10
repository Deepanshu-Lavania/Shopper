require("dotenv").config();
const express = require('express')
const cors = require("cors");
const connectDb = require('./utils/db');
const fileRoute = require("./router/file-route")
const productRoute = require("./router/product-route");

const app = express()

//middleware
app.use(express.json());
app.use(cors());


//API Creation(Routes)
app.use('/images',express.static('upload/images'))
app.use("/",fileRoute)
app.use('/',productRoute)


//listen server && connect with database
const port =  process.env.PORT || 9000;
connectDb().then(()=>{
    app.listen(port, (error) => {
        if (!error) {
            console.log(`Server is running at http://localhost:${port}`)  
        }else console.log(`Server is running at http://localhost:${port} with ${error}`) 
    })
})