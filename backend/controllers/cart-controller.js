const User = require("../models/user-model");
const addtoCart = async (req, res) => {
  console.log("req.body for addtoCart after authentication is ", req.body);
  console.log("req.user for addtoCart after authentication is is ", req.user);

  const reqId = req.user.id;
  let userData = await User.findOne({ _id: reqId });
  console.log("userData get ", userData);


  if (!userData.cardData[req.body.itemId]) {
    userData.cardData[req.body.itemId] = 0; // Initialize item count if it doesn't exist
  }
  await User.findOneAndUpdate(
    { _id: reqId },
    {
      $set: {
        [`cardData.${req.body.itemId}`]:
          (userData.cardData?.[req.body.itemId] || 0) + 1,
      },
    },
  );
  res.send({message:"addtoCart is successfully done"});
};
const removetoCart = async(req,res)=>{
    console.log("req.body for removetoCart after authentication is ", req.body);
    console.log("req.user for removetoCart after authentication is is ", req.user);
  
    const reqId = req.user.id;
    let userData = await User.findOne({ _id: reqId });
    console.log("userData get ", userData);
    if (userData.cardData[req.body.itemId]>0) {
        userData.cardData[req.body.itemId] -=1;
    }
    await User.findOneAndUpdate(
      { _id: reqId },
      {
        $set: {
          [`cardData.${req.body.itemId}`]:userData.cardData?.[req.body.itemId],
        },
      },
    );
    res.send({message:"removetoCart is successfully done"});
}
const getAll_cartNum = async(req,res)=>{
    console.log("req.body for getAll_cartNum after authentication is ", req.body);
    console.log("req.user for getAll_cartNum after authentication is is ", req.user);

    const reqId = req.user.id;
    let userData = await User.findOne({ _id: reqId });
    console.log("GetCartData ", userData.cardData);
    res.json(userData.cardData);

}
module.exports = {addtoCart, removetoCart, getAll_cartNum};
