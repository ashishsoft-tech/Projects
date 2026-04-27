const router = require("express").Router();
const {
  forgotPassword,
  verifyToken,
  resetPassword
} = require("../controllers/authController");

router.post("/forgot", forgotPassword);
router.get("/verify/:token", verifyToken);
router.post("/reset/:token", resetPassword);

module.exports = router;