const AuthUser = require("../Models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // check if email exists
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await AuthUser.create({
      name,
      email,
      password: hashedPassword
    });

    console.log(user)

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = { register, login };
