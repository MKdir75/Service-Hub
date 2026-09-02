import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getProviderBookings,
  updateBookingStatus,
} from "../../services/bookingService";

function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getProviderBookings();

      console.log("PROVIDER BOOKINGS:", result);

      setBookings(result.data || []);
    } catch (error) {
      console.error(
        "Fetch provider bookings error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (
    bookingId,
    status
  ) => {
    try {
      await updateBookingStatus(
        bookingId,
        status
      );
      await fetchBookings();
    } catch (error) {
      console.error(
        "Update booking status error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update booking status"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar type="provider" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            Provider Bookings
          </h1>

          {/* Loading */}
          {loading && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow">
              <p className="text-gray-500">
                Loading bookings...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-8 rounded-xl bg-red-50 p-8">
              <p className="text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* No bookings */}
          {!loading &&
            !error &&
            bookings.length === 0 && (
              <div className="mt-8 rounded-xl bg-white p-8 shadow">
                <p className="text-gray-500">
                  No bookings available.
                </p>
              </div>
            )}

          {/* Bookings */}
          {!loading &&
            !error &&
            bookings.length > 0 && (
              <div className="mt-8 space-y-6">

                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="rounded-xl bg-white p-6 shadow"
                  >

                    <div className="flex flex-col gap-6 md:flex-row">

                      {/* Service Image */}
                      <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100 md:w-52">

                        {booking.service?.image ? (
                          <img
                            src={
                              booking.service.image
                            }
                            alt={
                              booking.service.title
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-gray-400">
                              No Image
                            </span>
                          </div>
                        )}

                      </div>

                      {/* Booking Information */}
                      <div className="flex-1">

                        <h2 className="text-xl font-bold">
                          {booking.service?.title}
                        </h2>

                        <p className="mt-2 text-gray-600">
                          Customer:{" "}
                          {booking.customer?.name}
                        </p>

                        <p className="mt-2 text-gray-600">
                          Email:{" "}
                          {booking.customer?.email}
                        </p>

                        <p className="mt-2 text-gray-600">
                          Phone:{" "}
                          {booking.customer?.phone}
                        </p>

                        <p className="mt-2 text-gray-600">
                          Price: ৳{booking.price}
                        </p>

                        <p className="mt-2 text-gray-600">
                          Booking Date:{" "}
                          {new Date(
                            booking.bookingDate
                          ).toLocaleString()}
                        </p>

                        <p className="mt-2 text-gray-600">
                          Address:{" "}
                          {booking.address}
                        </p>

                        {booking.notes && (
                          <p className="mt-2 text-gray-600">
                            Notes:{" "}
                            {booking.notes}
                          </p>
                        )}

                        {/* Status */}
                        <div className="mt-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                              booking.status ===
                              "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status ===
                                  "accepted"
                                ? "bg-blue-100 text-blue-700"
                                : booking.status ===
                                  "completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status ===
                                  "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-wrap gap-3">

                          {booking.status ===
                            "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    booking._id,
                                    "accepted"
                                  )
                                }
                                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    booking._id,
                                    "rejected"
                                  )
                                }
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {booking.status ===
                            "accepted" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  booking._id,
                                  "completed"
                                )
                              }
                              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                              Mark Completed
                            </button>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

        </main>

      </div>
    </>
  );
}

export default ProviderBookings;

