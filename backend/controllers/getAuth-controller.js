const User = require("../models/user-model");

const getAuth = async (req, res) => {
  console.log("req.body for getAll_cartNum after authentication is ", req.body);
  console.log(
    "req.user for getAll_cartNum after authentication is is ",
    req.user
  );
  try {
    const reqId = req.user.id;
    let userData = await User.findOne({ _id: reqId });
    if (userData) {
      res.status(200).json(userData);
    }
  } catch (error) {
    console.log("getAuth-contoller.js to getAuth error is : ", error);
  }
};
module.exports = getAuth;
