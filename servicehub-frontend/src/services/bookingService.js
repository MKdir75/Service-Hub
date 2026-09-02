import api from "./api";

export const createBooking = async (bookingData) => {
  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get(
    "/bookings/my-bookings"
  );

  return response.data;
};

export const getProviderBookings = async () => {
  const response = await api.get(
    "/bookings/provider"
  );

  return response.data;
};

export const updateBookingStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/bookings/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

