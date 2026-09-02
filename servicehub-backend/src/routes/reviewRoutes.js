const express = require("express");

const {
  create,
  getByService,
  getMy,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/service/:serviceId",
  getByService
);

router.get(
  "/my-reviews",
  protect,
  authorize("customer"),
  getMy
);

router.post(
  "/",
  protect,
  authorize("customer"),
  create
);

module.exports = router;
