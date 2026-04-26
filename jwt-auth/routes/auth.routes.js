const express = require("express");
const { registerUser, loginUser} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { getMe } = require("../controllers/auth.controller");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Protected Route
router.get("/me", authMiddleware, getMe);

module.exports = router;