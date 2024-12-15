const express = require("express");
const userRoute = require("../controllers/user-controller");
const authmiddleware = require("../middleware/auth-middleware");
const router = express.Router();

router.post("/signup",userRoute.SignUp);
router.post("/login",userRoute.Login);
router.post("/getadminuser",authmiddleware,userRoute.getAdminUser);
router.post("/deleteadminuser",userRoute.deleteAdminUser);

module.exports  =router;