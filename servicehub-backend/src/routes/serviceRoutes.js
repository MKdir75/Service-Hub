const express = require("express");

const {
  create,
  getAll,
  getMy,
  getOne,
  update,
  remove,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get(
  "/my-services",
  protect,
  authorize("provider"),
  getMy
);

router.get(
  "/",
  getAll
);

router.get(
  "/:id",
  getOne
);


router.post(
  "/",
  protect,
  authorize("provider"),
  upload.single("image"),
  create
);

router.put(
  "/:id",
  protect,
  authorize("provider"),
  upload.single("image"),
  update
);

router.delete(
  "/:id",
  protect,
  authorize("provider"),
  remove
);

module.exports = router;