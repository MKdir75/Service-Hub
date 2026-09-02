import { Link } from "react-router-dom";

function Sidebar({ type }) {
  return (
    <aside className="min-h-screen w-64 border-r bg-white p-5">

      <h2 className="mb-6 text-xl font-bold">
        Dashboard
      </h2>

      {type === "customer" && (
        <div className="space-y-3">

          <Link
            to="/customer/dashboard"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Overview
          </Link>

          <Link
            to="/customer/bookings"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            My Bookings
          </Link>

          <Link
            to="/customer/reviews"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Reviews
          </Link>

        </div>
      )}

      {type === "provider" && (
        <div className="space-y-3">

          <Link
            to="/provider/dashboard"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Overview
          </Link>

          <Link
            to="/provider/services"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            My Services
          </Link>

          <Link
            to="/provider/services/create"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Create Service
          </Link>

          <Link
            to="/provider/bookings"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Bookings
          </Link>

        </div>
      )}

      {type === "admin" && (
        <div className="space-y-3">

          <Link
            to="/admin/dashboard"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Overview
          </Link>

          <Link
            to="/admin/users"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Users
          </Link>

          <Link
            to="/admin/providers"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Providers
          </Link>

          <Link
            to="/admin/bookings"
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            Bookings
          </Link>

        </div>
      )}

    </aside>
  );
}

export default Sidebar;