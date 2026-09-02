import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ServiceHub
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/services"
            className="text-gray-700 hover:text-blue-600"
          >
            Services
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;