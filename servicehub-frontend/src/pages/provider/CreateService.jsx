import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { createService } from "../../services/serviceService";

function CreateService() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!image) {
      setError("Please select a service image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("description", form.description);

      formData.append("image", image);

      console.log("Creating service...");

      const result = await createService(formData);

      console.log("SERVICE CREATED:", result);

      setSuccess("Service created successfully!");

      setForm({
        title: "",
        category: "",
        price: "",
        description: "",
      });

      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Create service error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar type="provider" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            Create Service
          </h1>

          {error && (
            <div className="mt-6 max-w-2xl rounded-lg bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 max-w-2xl rounded-lg bg-green-100 px-4 py-3 text-green-700">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-2xl space-y-5 rounded-xl bg-white p-8 shadow"
          >

            {/* Service Title */}
            <Input
              label="Service Title"
              name="title"
              placeholder="Professional Electrician"
              value={form.title}
              onChange={handleChange}
            />

            {/* Category */}
            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
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
              </select>
            </div>

            {/* Price */}
            <Input
              label="Price"
              name="price"
              type="number"
              placeholder="500"
              value={form.price}
              onChange={handleChange}
            />

            {/* Description */}
            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-lg border px-4 py-3"
                placeholder="Describe your service..."
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block font-medium">
                Service Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border px-4 py-3"
              />

              {/* Image Preview */}
              {preview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm text-gray-500">
                    Image Preview
                  </p>

                  <img
                    src={preview}
                    alt="Service preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating Service..."
                : "Create Service"}
            </Button>

          </form>

        </main>
      </div>
    </>
  );
}

export default CreateService;