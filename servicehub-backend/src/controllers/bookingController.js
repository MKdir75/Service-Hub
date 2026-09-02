const asyncHandler = require("../utils/asyncHandler");

const {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
} = require("../services/bookingService");

const create = asyncHandler(
  async (req, res) => {
    const booking =
      await createBooking({
        customerId: req.user._id,
        serviceId: req.body.serviceId,
        bookingDate:
          req.body.bookingDate,
        address: req.body.address,
        notes: req.body.notes,
      });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  }
);

const getCustomer =
  asyncHandler(async (req, res) => {
    const bookings =
      await getCustomerBookings(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: bookings,
    });
  });

const getProvider =
  asyncHandler(async (req, res) => {
    const bookings =
      await getProviderBookings(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: bookings,
    });
  });

const updateStatus =
  asyncHandler(async (req, res) => {
    const booking =
      await updateBookingStatus({
        bookingId: req.params.id,
        providerId: req.user._id,
        status: req.body.status,
      });

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: booking,
    });
  });

module.exports = {
  create,
  getCustomer,
  getProvider,
  updateStatus,
};