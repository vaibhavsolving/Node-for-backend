const express = require("express");
const { home, about, getUsersJson, createUser } = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/", home);
router.get("/about", about);
router.get("/api/users", getUsersJson);
router.post("/api/users", createUser);

// Protected route
router.get("/api/secret", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to the secret route!", user: req.user });
});
module.exports = router;
