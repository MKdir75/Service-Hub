const express = require("express");

const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.get(
  "/provider-test",
  authMiddleware,
  authorize("provider"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Provider access granted",
      user: req.user,
    });
  }
);

router.get(
  "/customer-test",
  authMiddleware,
  authorize("customer"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Customer access granted",
      user: req.user,
    });
  }
);

module.exports = router;