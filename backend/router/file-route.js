const express = require("express");
const multer = require("multer");

const router = express.Router();

//! Image Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images')
      },
    filename:(req,file,cb)=>{
        // return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage});
//creating Upload Endoint for images
router.post("/upload",upload.single('product'),(req,res)=>{
    res.send({
        success:1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})

module.exports = router;