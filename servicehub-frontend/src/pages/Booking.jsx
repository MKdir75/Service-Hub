import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { createBooking } from "../services/bookingService";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const [service, setService] = useState(null);

  const [form, setForm] = useState({
    bookingDate: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/services/${id}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch service"
          );
        }

        setService(result.data);
      } catch (error) {
        console.error(
          "Fetch service error:",
          error
        );

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [API_URL, id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const bookingData = {
        serviceId: id,
        bookingDate: form.bookingDate,
        address: form.address,
        notes: form.notes,
      };

      console.log(
        "BOOKING DATA:",
        bookingData
      );

      const result =
        await createBooking(bookingData);

      console.log(
        "BOOKING RESPONSE:",
        result
      );

      setSuccess(
        "Booking created successfully!"
      );

      setTimeout(() => {
        navigate("/customer/bookings");
      }, 1000);

    } catch (error) {
      console.error(
        "Create booking error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create booking"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-center text-gray-500">
            Loading service...
          </p>
        </main>
      </>
    );
  }

  if (error && !service) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/services"
              className="font-medium text-blue-600"
            >
              ← Back to Services
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-center text-gray-500">
            Service not found.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-8 md:grid-cols-2">

          {/* =========================
              Service Information
          ========================== */}

          <div className="rounded-xl bg-white p-8 shadow-sm">

            <h1 className="text-3xl font-bold">
              Book Service
            </h1>

            <div className="mt-8 overflow-hidden rounded-xl bg-gray-100">

              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <span className="text-gray-400">
                    No Image Available
                  </span>
                </div>
              )}

            </div>

            <p className="mt-6 font-medium text-blue-600">
              {service.category}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {service.title}
            </h2>

            <p className="mt-4 text-gray-600">
              {service.description}
            </p>

            <div className="mt-6">

              <p className="text-2xl font-bold">
                ৳{service.price}
              </p>

              <p className="mt-2 text-gray-500">
                📍 {service.location}
              </p>

            </div>

          </div>

          {/* =========================
              Booking Form
          ========================== */}

          <div className="rounded-xl bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold">
              Booking Information
            </h2>

            {error && (
              <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-600">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* Booking Date */}

              <div>
                <label
                  htmlFor="bookingDate"
                  className="mb-2 block text-sm font-medium"
                >
                  Booking Date
                </label>

                <input
                  id="bookingDate"
                  name="bookingDate"
                  type="datetime-local"
                  value={form.bookingDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Address */}

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Service Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Enter your service address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Notes */}

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium"
                >
                  Additional Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  placeholder="Any additional information..."
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Creating Booking..."
                  : "Confirm Booking"}
              </button>

            </form>

            <Link
              to={`/services/${service._id}`}
              className="mt-5 block text-center text-sm font-medium text-gray-500 hover:text-blue-600"
            >
              ← Back to Service
            </Link>

          </div>

        </div>

      </main>
    </>
  );
}

export default Booking;