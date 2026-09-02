import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getMyBookings } from "../../services/bookingService";
import { getMyReviews } from "../../services/reviewService";

function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const bookingResult =
          await getMyBookings();

        console.log(
          "DASHBOARD BOOKINGS:",
          bookingResult
        );

        const reviewResult =
          await getMyReviews();

        console.log(
          "DASHBOARD REVIEWS:",
          reviewResult
        );

        setBookings(
          bookingResult.data || []
        );

        setReviews(
          reviewResult.data || []
        );
      } catch (error) {
        console.error(
          "Customer dashboard error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalBookings = bookings.length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;

  const totalReviews = reviews.length;

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar type="customer" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            Customer Dashboard
          </h1>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4">
              <p className="text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="mt-8">
              Loading dashboard...
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-3">

              {/* Total Bookings */}
              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">
                  Total Bookings
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {totalBookings}
                </h2>
              </div>

              {/* Completed */}
              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {completedBookings}
                </h2>
              </div>

              {/* Reviews */}
              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-gray-500">
                  Reviews
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {totalReviews}
                </h2>
              </div>

            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default CustomerDashboard;

