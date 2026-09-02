import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

function MyServices() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar type="provider" />

        <main className="flex-1 p-8">

          <div className="flex items-center justify-between">

            <h1 className="text-3xl font-bold">
              My Services
            </h1>

            <Link
              to="/provider/services/create"
              className="rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Create Service
            </Link>

          </div>

          <div className="mt-8 rounded-xl bg-white p-8 shadow">
            <p className="text-gray-500">
              You haven't created any services yet.
            </p>
          </div>

        </main>

      </div>
    </>
  );
}

export default MyServices;