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
    console.log("user is : ",user);
    
    // Generate a JWT token
    const token = jwt.sign(
      { user: { id: user._id } },
      'secret_ecom', // Use a proper environment variable for secret
      { expiresIn: "30d" } // Set token expiration
    );

    // Return success response with token
    res.status(201).json({message: "SignUp successfully", user, success: true, token });
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
      success:true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { SignUp, Login };
