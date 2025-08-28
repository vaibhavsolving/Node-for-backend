// index.js                    //cd C:\Users\VAIBHAV-MAURYA\DevRepos\Node-for-backend = this is path name
                               // whenever get error use above line 

// const http = require("http");                      // express ki jawah se ye use nhi krna pda

//basic express Api
// index.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // to handle JSON body

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" Mongo Error:", err);
    process.exit(1); // Exit if DB not connected
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

// Routes

// Home
app.get("/", (req, res) => {
  return res.send("Hello Aditya sir From Home Page");
});

// About
app.get("/about", (req, res) => {
  return res.send("Hello Aditya sir From About Page");
});

// Get all users (HTML list)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    const html = `
      <ul>
          ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
      </ul>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
});

// Get all users (JSON response) -> for APIs
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
});

// Create new user
app.post("/api/users", async (req, res) => {
  const { firstName, lastName, email, gender, jobTitle } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !gender || !jobTitle) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  try {
    const result = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle,
    });

    console.log(" User created:", result);
    return res.status(201).json({ msg: "Success", user: result });
  } catch (err) {
    console.error(" Error creating user:", err);

    // Duplicate email error (Mongo error code 11000)
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});