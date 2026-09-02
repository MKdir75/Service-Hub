const express = require("express");

const {
  getProviderDashboardData,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/provider",
  protect,
  authorize("provider"),
  getProviderDashboardData
);

module.exports = router;