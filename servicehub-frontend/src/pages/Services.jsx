import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ServiceCard from "../components/service/ServiceCard";
import ServiceSearch from "../components/service/ServiceSearch";
import ServiceFilter from "../components/service/ServiceFilter";

const API_URL = process.env.REACT_APP_API_URL;

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/services`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch services"
          );
        }

        setServices(result.data || []);
      } catch (error) {
        console.error("Fetch services error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      !category ||
      service.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="text-4xl font-bold">
          Find Services
        </h1>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">

          <div className="flex-1">
            <ServiceSearch
              search={search}
              setSearch={setSearch}
            />
          </div>

          <ServiceFilter
            category={category}
            setCategory={setCategory}
          />

        </div>

        {loading && (
          <p className="mt-10 text-center text-gray-500">
            Loading services...
          </p>
        )}

        {error && (
          <p className="mt-10 text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {filteredServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                />
              ))}

            </div>

            {filteredServices.length === 0 && (
              <p className="mt-10 text-center text-gray-500">
                No services found.
              </p>
            )}
          </>
        )}

      </main>

      <Footer />
    </>
  );
}

export default Services;