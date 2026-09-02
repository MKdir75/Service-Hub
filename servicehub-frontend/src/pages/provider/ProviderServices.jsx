import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getMyServices,
  deleteService,
} from "../../services/serviceService";

function ProviderServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {  
    const fetchMyServices = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getMyServices();

        console.log(
          "MY PROVIDER SERVICES:",
          result
        );

        setServices(
          result.data || []
        );
      } catch (error) {
        console.error(
          "Fetch provider services error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load services"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyServices();
  }, []);

  const handleDelete = async (
    serviceId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this service?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(serviceId);
      setError("");

      await deleteService(
        serviceId
      );

      setServices(
        (previousServices) =>
          previousServices.filter(
            (service) =>
              service._id !== serviceId
          )
      );
    } catch (error) {
      console.error(
        "Delete service error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete service"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50">
        <Sidebar type="provider" />

        <main className="flex-1 p-8">

          {/* ========================================
              Header
          ======================================== */}

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Services
              </h1>

              <p className="mt-2 text-gray-500">
                Manage your services
              </p>
            </div>

            <Link
              to="/provider/services/create"
              className="inline-flex w-fit rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              + Create Service
            </Link>

          </div>

          {/* ========================================
              Error
          ======================================== */}

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4">
              <p className="text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* ========================================
              Loading
          ======================================== */}

          {loading && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow">
              <p className="text-gray-500">
                Loading services...
              </p>
            </div>
          )}

          {/* ========================================
              Empty
          ======================================== */}

          {!loading &&
            !error &&
            services.length === 0 && (
              <div className="mt-8 rounded-xl bg-white p-10 text-center shadow">

                <h2 className="text-xl font-semibold text-gray-800">
                  No services found
                </h2>

                <p className="mt-2 text-gray-500">
                  You haven't created any
                  services yet.
                </p>

                <Link
                  to="/provider/services/create"
                  className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  Create Your First Service
                </Link>

              </div>
            )}

          {/* ========================================
              Services
          ======================================== */}

          {!loading &&
            services.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {services.map(
                  (service) => (
                    <div
                      key={service._id}
                      className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
                    >

                      {/* ========================================
                          Image
                      ======================================== */}

                      <div className="h-52 w-full bg-gray-100">

                        {service.image ? (
                          <img
                            src={
                              service.image
                            }
                            alt={
                              service.title
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

                      {/* ========================================
                          Content
                      ======================================== */}

                      <div className="p-6">

                        {/* Title */}

                        <h2 className="text-xl font-bold text-gray-900">
                          {service.title}
                        </h2>

                        {/* Category */}

                        <p className="mt-2 text-sm font-medium text-blue-600">
                          {service.category}
                        </p>

                        {/* Description */}

                        <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                          {service.description}
                        </p>

                        {/* Price */}

                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gray-900">
                            ৳
                            {service.price}
                          </span>
                        </div>

                        {/* Location */}

                        <p className="mt-2 text-sm text-gray-500">
                          📍{" "}
                          {service.location}
                        </p>

                        {/* ========================================
                            Rating
                        ======================================== */}

                        <div className="mt-4 flex items-center justify-between">

                          <div>

                            <span className="text-yellow-500">
                              ★
                            </span>

                            <span className="ml-1 font-medium text-gray-800">
                              {service.rating ||
                                0}
                            </span>

                            <span className="ml-1 text-sm text-gray-500">
                              (
                              {service.totalReviews ||
                                0}{" "}
                              reviews)
                            </span>

                          </div>

                          {/* Status */}

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              service.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {service.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </div>

                        {/* ========================================
                            Actions
                        ======================================== */}

                        <div className="mt-6 flex gap-3">

                          {/* Edit */}

                          <Link
                            to={`/provider/services/edit/${service._id}`}
                            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                service._id
                              )
                            }
                            disabled={
                              deletingId ===
                              service._id
                            }
                            className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId ===
                            service._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>

                      </div>
                    </div>
                  )
                )}

              </div>
            )}

        </main>
      </div>
    </>
  );
}

export default ProviderServices;