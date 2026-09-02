const Booking = require("../models/Booking");
const Service = require("../models/Service");
const ApiError = require("../utils/apiError");

const {
  getS3SignedUrl,
} = require("../config/aws");

const createBooking = async ({
  customerId,
  serviceId,
  bookingDate,
  address,
  notes,
}) => {
  const service = await Service.findById(
    serviceId
  );

  if (!service || !service.isActive) {
    throw new ApiError(
      404,
      "Service not found"
    );
  }

  const booking = await Booking.create({
    customer: customerId,
    provider: service.provider,
    service: service._id,
    bookingDate,
    address,
    notes,
    price: service.price,
  });

  return booking.populate([
    {
      path: "service",
      select:
        "title price image imageKey",
    },
    {
      path: "provider",
      select:
        "name email phone",
    },
  ]);
};

const getCustomerBookings = async (
  customerId
) => {
  const bookings = await Booking.find({
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

  for (const booking of bookings) {
    if (booking.service?.imageKey) {
      booking.service.image =
        await getS3SignedUrl(
          booking.service.imageKey
        );
    }
  }

  return bookings;
};

const getProviderBookings = async (
  providerId
) => {
  const bookings = await Booking.find({
    provider: providerId,
  })
    .populate(
      "service",
      "title price image imageKey"
    )
    .populate(
      "customer",
      "name email phone"
    )
    .sort({
      createdAt: -1,
    });


  
  for (const booking of bookings) {
    if (booking.service?.imageKey) {
      booking.service.image =
        await getS3SignedUrl(
          booking.service.imageKey
        );
    }
  }

  return bookings;
};

const updateBookingStatus = async ({
  bookingId,
  providerId,
  status,
}) => {
  const booking = await Booking.findById(
    bookingId
  );

  if (!booking) {
    throw new ApiError(
      404,
      "Booking not found"
    );
  }

  if (
    booking.provider.toString() !==
    providerId.toString()
  ) {
    throw new ApiError(
      403,
      "You can only manage your own bookings"
    );
  }

  booking.status = status;

  await booking.save();

  return booking;
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
};