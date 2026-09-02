import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import { getMyReviews } from "../../services/reviewService";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMyReviews();

        console.log("MY REVIEWS:", result);

        setReviews(result.data || []);
      } catch (error) {
        console.error(
          "Fetch reviews error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar type="customer" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            My Reviews
          </h1>

          {/* Loading */}
          {loading && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow">
              <p className="text-gray-500">
                Loading reviews...
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

          {/* No Reviews */}
          {!loading &&
            !error &&
            reviews.length === 0 && (
              <div className="mt-8 rounded-xl bg-white p-8 shadow">
                <p className="text-gray-500">
                  You haven't written any reviews yet.
                </p>
              </div>
            )}

          {/* Reviews */}
          {!loading &&
            !error &&
            reviews.length > 0 && (
              <div className="mt-8 space-y-6">

                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-xl bg-white p-6 shadow"
                  >

                    <div className="flex flex-col gap-6 md:flex-row">

                      {/* Service Image */}
                      <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100 md:w-52">

                        {review.service?.image ? (
                          <img
                            src={review.service.image}
                            alt={
                              review.service.title
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

                      {/* Review Information */}
                      <div className="flex-1">

                        <h2 className="text-xl font-bold">
                          {review.service?.title}
                        </h2>

                        <p className="mt-2 text-gray-600">
                          Provider:{" "}
                          {review.provider?.name}
                        </p>

                        <p className="mt-2 text-gray-600">
                          Price: ৳
                          {review.service?.price}
                        </p>

                        {/* Rating */}
                        <div className="mt-3">
                          <span className="font-medium">
                            Rating:
                          </span>{" "}

                          <span className="text-yellow-500">
                            {"★".repeat(
                              review.rating
                            )}
                          </span>

                          <span className="text-gray-400">
                            {"★".repeat(
                              5 - review.rating
                            )}
                          </span>

                          <span className="ml-2 text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>

                        {/* Comment */}
                        <p className="mt-4 text-gray-700">
                          <span className="font-medium">
                            Comment:
                          </span>{" "}
                          {review.comment}
                        </p>

                        {/* Date */}
                        <p className="mt-3 text-sm text-gray-400">
                          Reviewed on:{" "}
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </p>

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

export default Reviews;
