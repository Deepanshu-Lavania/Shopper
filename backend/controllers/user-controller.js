const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Initialize an empty cart object with 300 keys set to 0
    const cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Create a new user instance
    const user = new User({
      username,
      email,
      password: hashedPassword,
      cardData: cart,
    });

    // Save the user to the database
    await user.save();
    console.log("user is : ", user);

    // Generate a JWT token
    const token = jwt.sign(
      { user: { id: user._id } },
      "secret_ecom", // Use a proper environment variable for secret
      { expiresIn: "30d" } // Set token expiration
    );

    // Return success response with token
    res
      .status(201)
      .json({ message: "SignUp successfully", user, success: true, token });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // Find user by email
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Invalid User or password" });
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    // Check if password matches
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid User or password" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { user: { id: user._id } },
      "secret_ecom", // Use a proper environment variable for secret
      { expiresIn: "30d" } // Set token expiration
    );

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAdminUser = async (req, res) => {
  console.log("req.user.id in getAdminUser for user-controller : ",req.user.id);
  try {
    let getUser = await User.find({_id:{$ne:req.user.id}});
    res.json({
      success: true,
      message: "User get successfully!",
      getuser: getUser,
    });
  } catch (error) {
    console.error("Error to getting all Users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: error.message,
    });
  }
};
const deleteAdminUser = async (req, res) => {
  try {
    console.log("req.body.id is:", req.body);
    // Validate request body
    if (!req.body.id) {
      return res.status(400).send({ message: "User ID is required" });
    }
    // Delete the user by ID
    const deletedUser = await User.deleteOne({ _id: req.body.id });
    if (deletedUser.deletedCount > 0) {
      const remainingUsers = await User.find();
      return res.status(200).send({
        message: "User deleted successfully",
        remainingUsers,
      });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("deleteAdminUser error:", error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

module.exports = { SignUp, Login, getAdminUser, deleteAdminUser };
