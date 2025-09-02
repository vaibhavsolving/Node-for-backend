const mongoose = require("mongoose");
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

// Export
module.exports = User;
