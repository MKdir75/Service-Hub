const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const ApiError = require("../utils/apiError");

const {
  getS3SignedUrl,
} = require("../config/aws");

const createReview = async ({
  customerId,
  serviceId,
  rating,
  comment,
}) => {
  const completedBooking =
    await Booking.findOne({
      customer: customerId,
      service: serviceId,
      status: "completed",
    });

  if (!completedBooking) {
    throw new ApiError(
      400,
      "You can review a service only after completing a booking"
    );
  }

  const existingReview =
    await Review.findOne({
      customer: customerId,
      service: serviceId,
    });

  if (existingReview) {
    throw new ApiError(
      409,
      "You have already reviewed this service"
    );
  }

  const review = await Review.create({
    customer: customerId,
    service: serviceId,
    provider: completedBooking.provider,
    rating,
    comment,
  });

  const reviews = await Review.find({
    service: serviceId,
  });

  const totalRating = reviews.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  const averageRating =
    totalRating / reviews.length;

  await Service.findByIdAndUpdate(
    serviceId,
    {
      rating: Number(
        averageRating.toFixed(1)
      ),
      totalReviews: reviews.length,
    }
  );

  return review;
};

const getServiceReviews = async (
  serviceId
) => {
  const reviews = await Review.find({
    service: serviceId,
  })
    .populate(
      "customer",
      "name avatar"
    )
    .sort({
      createdAt: -1,
    });

  return reviews;
};

const getMyReviews = async (
  customerId
) => {
  const reviews = await Review.find({
    customer: customerId,
  })
    .populate(
      "service",
      "title price image imageKey"
    )
    .populate(
      "provider",
      "name email phone"
    )
    .sort({
      createdAt: -1,
    });

  for (const review of reviews) {
    if (review.service?.imageKey) {
      review.service.image =
        await getS3SignedUrl(
          review.service.imageKey
        );
    }
  }

  return reviews;
};


module.exports = {
  createReview,
  getServiceReviews,
  getMyReviews,
};
