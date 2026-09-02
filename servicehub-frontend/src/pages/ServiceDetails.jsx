import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

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

        console.log("SERVICE DATA:", result.data);
        console.log("SERVICE IMAGE:", result.data.image);


        setService(result.data);
      } catch (error) {
        console.error("Fetch service error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [API_URL, id]);

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

  if (error) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
            {error}
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
            Service not found
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl bg-white p-8 shadow-sm">

          <div className="grid gap-10 md:grid-cols-2">

            {/* Service Image */}
            <div className="overflow-hidden rounded-xl bg-gray-100">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-96 w-full object-cover"
                />
              ) : (
                <div className="flex h-96 items-center justify-center">
                  <span className="text-gray-400">
                    No Image Available
                  </span>
                </div>
              )}
            </div>

            {/* Service Information */}
            <div>

              <span className="font-medium text-blue-600">
                {service.category}
              </span>

              <h1 className="mt-3 text-4xl font-bold">
                {service.title}
              </h1>

              <p className="mt-5 leading-7 text-gray-600">
                {service.description}
              </p>

              <div className="mt-6">

                <p className="text-3xl font-bold">
                  ৳{service.price}
                </p>

                <p className="mt-2 text-gray-500">
                  📍 {service.location}
                </p>

              </div>

              {/* Provider */}
              {service.provider && (
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <p className="font-semibold">
                    Service Provider
                  </p>

                  <p className="mt-2 text-gray-600">
                    {service.provider.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {service.provider.email}
                  </p>
                </div>
              )}

              <Link
                to={`/booking/${service._id}`}
                className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
              >
                Book Service
              </Link>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}

export default ServiceDetails;

