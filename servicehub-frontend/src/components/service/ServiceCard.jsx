import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">

      {/* Service Image */}
      <div className="h-44 bg-gray-100">

        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-gray-400">
              No Image Available
            </span>
          </div>
        )}

      </div>

      {/* Service Information */}
      <div className="p-5">

        <p className="text-sm font-medium text-blue-600">
          {service.category}
        </p>

        <h3 className="mt-2 text-xl font-bold">
          {service.title}
        </h3>

        <p className="mt-2 text-gray-500">
          📍 {service.location}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <span className="font-bold">
            ${service.price}
          </span>

          <Link
            to={`/services/${service._id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ServiceCard;

