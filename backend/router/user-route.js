const express = require("express");
const userRoute = require("../controllers/user-controller");
const router = express.Router();

router.post("/signup",userRoute.SignUp);
router.post("/login",userRoute.Login);
router.get("/getadminuser",userRoute.getAdminUser);
router.post("/deleteadminuser",userRoute.deleteAdminUser);

module.exports  =router;