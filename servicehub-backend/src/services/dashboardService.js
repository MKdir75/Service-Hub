const Service = require("../models/Service");
const Booking = require("../models/Booking");

const getProviderDashboard = async (providerId) => {
  const services = await Service.find({
    provider: providerId,
    isActive: true,
  });

  const bookings = await Booking.find({
    provider: providerId,
  });

  let rating = 0;

  if (services.length > 0) {
    const totalRating = services.reduce(
      (sum, service) =>
        sum + (Number(service.rating) || 0),
      0
    );

    rating = totalRating / services.length;
  }

  return {
    services: services.length,
    bookings: bookings.length,
    rating: Number(rating.toFixed(1)),
  };
};

module.exports = {
  getProviderDashboard,
};