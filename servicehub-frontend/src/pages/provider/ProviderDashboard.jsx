import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getProviderDashboard } from "../../services/dashboardService";

function ProviderDashboard() {
  const [dashboard, setDashboard] = useState({
    services: 0,
    bookings: 0,
    rating: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getProviderDashboard();

        console.log(
          "PROVIDER DASHBOARD:",
          result
        );

        setDashboard(
          result.data || {
            services: 0,
            bookings: 0,
            rating: 0,
          }
        );
      } catch (error) {
        console.error(
          "Provider dashboard error:",
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

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar type="provider" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            Provider Dashboard
          </h1>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4">
              <p className="text-red-600">
                {error}
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* Services */}
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Services
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {loading
                  ? "..."
                  : dashboard.services}
              </h2>
            </div>

            {/* Bookings */}
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Bookings
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {loading
                  ? "..."
                  : dashboard.bookings}
              </h2>
            </div>

            {/* Rating */}
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Rating
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {loading
                  ? "..."
                  : dashboard.rating}
              </h2>
            </div>

          </div>

        </main>
      </div>
    </>
  );
}

export default ProviderDashboard;
