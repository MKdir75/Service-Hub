import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

function Bookings() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar type="admin" />

        <main className="flex-1 p-8">

          <h1 className="text-3xl font-bold">
            All Bookings
          </h1>

          <div className="mt-8 rounded-xl bg-white p-8 shadow">
            <p className="text-gray-500">
              Booking list will appear here.
            </p>
          </div>

        </main>

      </div>
    </>
  );
}

export default Bookings;