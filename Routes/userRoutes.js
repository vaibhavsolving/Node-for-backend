const express = require("express");
const { home, about, getUsersJson, createUser } = require("../Controllers/userController");

const router = express.Router();

router.get("/", home);
router.get("/about", about);
router.get("/api/users", getUsersJson);
router.post("/api/users", createUser);

module.exports = router;
