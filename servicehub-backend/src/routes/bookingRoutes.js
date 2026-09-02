const express = require("express");

const {
  create,
  getCustomer,
  getProvider,
  updateStatus,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  create
);

router.get(
  "/my-bookings",
  protect,
  authorize("customer"),
  getCustomer
);

router.get(
  "/provider",
  protect,
  authorize("provider"),
  getProvider
);

router.patch(
  "/:id/status",
  protect,
  authorize("provider"),
  updateStatus
);

module.exports = router;
