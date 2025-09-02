const User = require("../models/userModel");

// Home
const home = (req, res) => {
  res.send("Hello Aditya sir From Home Page");
};

// About
const about = (req, res) => {
  res.send("Hello Aditya sir From About Page");
};

// Get all users (JSON)
const getUsersJson = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching users", error: err.message });
  }
};


// Create user
const createUser = async (req, res) => {
  const { firstName, lastName, email, gender, jobTitle } = req.body;

  if (!firstName || !lastName || !email || !gender || !jobTitle) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  try {
    const result = await User.create({ firstName, lastName, email, gender, jobTitle });
    console.log("User created:", result);
    return res.status(201).json({ msg: "Success", user: result });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = { home, about, getUsersJson, createUser };
