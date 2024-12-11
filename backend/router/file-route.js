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
//! The upload.single('product') middleware provided by Multer is used to handle the upload of a single file in an HTTP request. 
/* File Upload Handling:

This middleware processes a single file uploaded via a form with the key name "product". It extracts the file from the request and saves it to the destination specified in the Multer storage configuration (in this case, storage).
Populating req.file:

After the middleware runs, the uploaded file's metadata is added to req.file. This object contains details about the file, such as:
filename: The name of the saved file (as determined by the filename function in your storage configuration).
path: The file's path on the server.
originalname: The original name of the uploaded file.
size: The size of the uploaded file.
mimetype: The MIME type of the file (e.g., image/jpeg).

Pre-Processing for the Route:
The middleware runs before the route handler. If there are errors (e.g., no file provided or invalid file type), Multer will handle them and prevent the route handler from executing.
Why Use upload.single('product')?
Specifies the Key Name: The string 'product' must match the key used in the frontend's FormData.append call: */


module.exports = router;