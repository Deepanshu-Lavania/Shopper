const jwt = require("jsonwebtoken");
// const User = require("../models/user-model");

//middleware to fetch (user-Authenticated user)
const authmiddleware = async (req, res, next) => {
  //! Get the token from the Authorization header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Token not provided." });
  }
  console.log("token from auth middleware :==> ", token);
  //! verify webjsontoken
  try {
    const isVerified = jwt.verify(token,'secret_ecom');
    console.log("token is verified : ", isVerified); //give data of jsonwebtoken payloads
    req.user= isVerified.user
    next();
  } catch (errors) {
    return res
      .status(401)
      .json({errors:"please authenticate using a valid token"});
  }
  //?Assuming token is in the format "Bearer <jwtTojen> , Remmind the "Bearer" prifix"
};
module.exports = authmiddleware;

// const userData = await User.findOne({email:isVerified.email}).select({password:0});
// console.log("userData of auth-middleware after verified is : ", userData);

// req.userDetail=userData;
// req.token=token;
// req.userID =userData._id;
