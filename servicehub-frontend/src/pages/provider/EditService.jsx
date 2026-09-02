import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getServiceById,
  updateService,
} from "../../services/serviceService";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    location: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getServiceById(id);

        console.log(
          "EDIT SERVICE:",
          result
        );

        const service = result.data;

        if (!service) {
          setError("Service not found.");
          return;
        }

        setFormData({
          title: service.title || "",
          category: service.category || "",
          price: service.price ?? "",
          description: service.description || "",
          location: service.location || "",
        });

        setCurrentImage(
          service.image || ""
        );
      } catch (error) {
        console.error(
          "Fetch service error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load service"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Service title is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError("Please enter a valid price.");
      return;
    }

    if (!formData.description.trim()) {
      setError(
        "Service description is required."
      );
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    try {
      setUpdating(true);

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "price",
        Number(formData.price)
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "location",
        formData.location.trim()
      );

      if (image) {
        data.append("image", image);
      }

      console.log(
        "UPDATING SERVICE:",
        id
      );

      const result = await updateService(
        id,
        data
      );

      console.log(
        "SERVICE UPDATED:",
        result
      );

      setSuccess(
        "Service updated successfully!"
      );

      setTimeout(() => {
        navigate("/provider/services");
      }, 1000);
    } catch (error) {
      console.error(
        "Update service error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update service"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen bg-gray-50">
          <Sidebar type="provider" />

          <main className="flex-1 p-8">

            <div className="rounded-xl bg-white p-8 shadow">
              <p className="text-gray-500">
                Loading service...
              </p>
            </div>

          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50">
        <Sidebar type="provider" />

        <main className="flex-1 p-8">

          {/* ========================================
              Header
          ======================================== */}

          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Service
              </h1>

              <p className="mt-2 text-gray-500">
                Update your service information
              </p>
            </div>

            <Link
              to="/provider/services"
              className="inline-flex w-fit rounded-lg bg-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-300"
            >
              ← Back to Services
            </Link>

          </div>

          {/* ========================================
              Error
          ======================================== */}

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4">
              <p className="text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* ========================================
              Success
          ======================================== */}

          {success && (
            <div className="mb-6 rounded-lg bg-green-50 p-4">
              <p className="text-green-600">
                {success}
              </p>
            </div>
          )}

          {/* ========================================
              Form
          ======================================== */}

          {!error && (
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl rounded-xl bg-white p-8 shadow"
            >

              {/* Service Title */}

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Service Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter service title"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Category */}

              <div className="mt-6">
                <label className="mb-2 block font-medium text-gray-700">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Electrician">
                    Electrician
                  </option>

                  <option value="Plumber">
                    Plumber
                  </option>

                  <option value="Cleaner">
                    Cleaner
                  </option>

                  <option value="Tutor">
                    Tutor
                  </option>

                  <option value="Photographer">
                    Photographer
                  </option>
                </select>
              </div>

              {/* Price */}

              <div className="mt-6">
                <label className="mb-2 block font-medium text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Location */}

              <div className="mt-6">
                <label className="mb-2 block font-medium text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter service location"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}

              <div className="mt-6">
                <label className="mb-2 block font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your service"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Current Image */}

              {currentImage && (
                <div className="mt-6">
                  <label className="mb-3 block font-medium text-gray-700">
                    Current Image
                  </label>

                  <div className="h-56 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={currentImage}
                      alt={formData.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* New Image */}

              <div className="mt-6">
                <label className="mb-2 block font-medium text-gray-700">
                  New Service Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                {image && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {image.name}
                  </p>
                )}

                <p className="mt-2 text-sm text-gray-400">
                  Leave empty if you want to keep the
                  current image.
                </p>
              </div>

              {/* Buttons */}

              <div className="mt-8 flex gap-3">

                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating
                    ? "Updating..."
                    : "Update Service"}
                </button>

                <Link
                  to="/provider/services"
                  className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-300"
                >
                  Cancel
                </Link>

              </div>

            </form>
          )}

        </main>
      </div>
    </>
  );
}

export default EditService;

