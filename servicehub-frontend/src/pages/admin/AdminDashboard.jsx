import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar type="admin" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Users
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                0
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Providers
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                0
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Services
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                0
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Bookings
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                0
              </h2>
            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default AdminDashboard;