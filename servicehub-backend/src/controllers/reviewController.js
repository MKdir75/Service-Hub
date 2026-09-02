const asyncHandler = require("../utils/asyncHandler");

const {
  createReview,
  getServiceReviews,
  getMyReviews,
} = require("../services/reviewService");

const create = asyncHandler(
  async (req, res) => {
    const review =
      await createReview({
        customerId: req.user._id,
        serviceId: req.body.serviceId,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  }
);

const getByService = asyncHandler(
  async (req, res) => {
    const reviews =
      await getServiceReviews(
        req.params.serviceId
      );

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  }
);

const getMy = asyncHandler(
  async (req, res) => {
    const reviews =
      await getMyReviews(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  }
);

module.exports = {
  create,
  getByService,
  getMy,
};

