const express = require("express");
const userRoute = require("../controllers/user-controller");
const router = express.Router();

router.post("/signup",userRoute.SignUp);
router.post("/login",userRoute.Login);

module.exports  =router;