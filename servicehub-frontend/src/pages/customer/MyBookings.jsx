import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getMyBookings } from "../../services/bookingService";
import { createReview } from "../../services/reviewService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviewingBookingId, setReviewingBookingId] =
    useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [reviewLoading, setReviewLoading] =
    useState(false);

  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMyBookings();

        console.log("MY BOOKINGS:", result);

        setBookings(result.data || []);
      } catch (error) {
        console.error(
          "Fetch bookings error:",
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

    fetchBookings();
  }, []);

  const handleOpenReview = (bookingId) => {
    setReviewingBookingId(bookingId);

    setRating(5);
    setComment("");

    setReviewError("");
    setReviewSuccess("");
  };

  const handleCloseReview = () => {
    setReviewingBookingId(null);

    setRating(5);
    setComment("");

    setReviewError("");
    setReviewSuccess("");
  };

  const handleSubmitReview = async (booking) => {
    if (!rating) {
      setReviewError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setReviewError(
        "Please write a comment."
      );
      return;
    }

    try {
      setReviewLoading(true);
      setReviewError("");
      setReviewSuccess("");

      const result = await createReview({
        serviceId: booking.service?._id,
        rating: Number(rating),
        comment: comment.trim(),
      });

      console.log(
        "REVIEW CREATED:",
        result
      );

      setReviewSuccess(
        "Review submitted successfully!"
      );

      setTimeout(() => {
        setReviewingBookingId(null);
        setRating(5);
        setComment("");
        setReviewSuccess("");
      }, 1000);

    } catch (error) {
      console.error(
        "Create review error:",
        error
      );

      setReviewError(
        error.response?.data?.message ||
          "Failed to submit review"
      );
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar type="customer" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            My Bookings
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

          {/* No Bookings */}
          {!loading &&
            !error &&
            bookings.length === 0 && (
              <div className="mt-8 rounded-xl bg-white p-8 shadow">
                <p className="text-gray-500">
                  You don't have any bookings yet.
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
                          Provider:{" "}
                          {booking.provider?.name}
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
                              "completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status ===
                                  "accepted"
                                ? "bg-blue-100 text-blue-700"
                                : booking.status ===
                                  "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {/* =====================================
                            Write Review Button
                           ===================================== */}

                        {booking.status ===
                          "completed" && (
                          <div className="mt-5">

                            <button
                              type="button"
                              onClick={() =>
                                handleOpenReview(
                                  booking._id
                                )
                              }
                              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                            >
                              Write Review
                            </button>

                          </div>
                        )}

                      </div>

                    </div>

                    {/* ==========================================
                        Review Form
                       ========================================== */}

                    {reviewingBookingId ===
                      booking._id && (
                      <div className="mt-6 border-t pt-6">

                        <h3 className="text-xl font-bold">
                          Write a Review
                        </h3>

                        {/* Review Error */}
                        {reviewError && (
                          <div className="mt-4 rounded-lg bg-red-50 p-3">
                            <p className="text-red-600">
                              {reviewError}
                            </p>
                          </div>
                        )}

                        {/* Review Success */}
                        {reviewSuccess && (
                          <div className="mt-4 rounded-lg bg-green-50 p-3">
                            <p className="text-green-600">
                              {reviewSuccess}
                            </p>
                          </div>
                        )}

                        {/* Rating */}
                        <div className="mt-5">

                          <label className="mb-2 block font-medium">
                            Rating
                          </label>

                          <div className="flex items-center gap-2">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setRating(star)
                                  }
                                  className={`text-3xl ${
                                    star <= rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </button>
                              )
                            )}

                            <span className="ml-2 text-gray-600">
                              {rating}/5
                            </span>

                          </div>

                        </div>

                        {/* Comment */}
                        <div className="mt-5">

                          <label className="mb-2 block font-medium">
                            Comment
                          </label>

                          <textarea
                            value={comment}
                            onChange={(e) =>
                              setComment(
                                e.target.value
                              )
                            }
                            rows="4"
                            placeholder="Write your review..."
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                          />

                        </div>

                        {/* Buttons */}
                        <div className="mt-5 flex gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              handleSubmitReview(
                                booking
                              )
                            }
                            disabled={
                              reviewLoading
                            }
                            className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {reviewLoading
                              ? "Submitting..."
                              : "Submit Review"}
                          </button>

                          <button
                            type="button"
                            onClick={
                              handleCloseReview
                            }
                            disabled={
                              reviewLoading
                            }
                            className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-300"
                          >
                            Cancel
                          </button>

                        </div>

                      </div>
                    )}

                  </div>

                ))}

              </div>
            )}

        </main>
      </div>
    </>
  );
}

export default MyBookings;

