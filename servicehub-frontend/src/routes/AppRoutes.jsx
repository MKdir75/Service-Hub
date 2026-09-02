import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Booking from "../pages/Booking";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import MyBookings from "../pages/customer/MyBookings";
import Reviews from "../pages/customer/Reviews";


import ProviderDashboard from "../pages/provider/ProviderDashboard";
import ProviderServices from "../pages/provider/ProviderServices";
import CreateService from "../pages/provider/CreateService";
import EditService from "../pages/provider/EditService";
import ProviderBookings from "../pages/provider/ProviderBookings";


import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Providers from "../pages/admin/Providers";
import Bookings from "../pages/admin/Bookings";

import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================================
            Public Routes
        ======================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />

        {/* ========================================
            Customer Routes
        ======================================== */}

        {/* Booking */}

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute roles={["customer"]}>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* Customer Dashboard */}

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute roles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* My Bookings */}

        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute roles={["customer"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* My Reviews */}

        <Route
          path="/customer/reviews"
          element={
            <ProtectedRoute roles={["customer"]}>
              <Reviews />
            </ProtectedRoute>
          }
        />

        {/* ========================================
            Provider Routes
        ======================================== */}

        {/* Provider Dashboard */}

        <Route
          path="/provider/dashboard"
          element={
            <ProtectedRoute roles={["provider"]}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        {/* Provider My Services */}

        <Route
          path="/provider/services"
          element={
            <ProtectedRoute roles={["provider"]}>
              <ProviderServices />
            </ProtectedRoute>
          }
        />

        {/* Create Service */}

        <Route
          path="/provider/services/create"
          element={
            <ProtectedRoute roles={["provider"]}>
              <CreateService />
            </ProtectedRoute>
          }
        />

        {/* Edit Service */}

        <Route
          path="/provider/services/edit/:id"
          element={
            <ProtectedRoute roles={["provider"]}>
              <EditService />
            </ProtectedRoute>
          }
        />

        {/* Provider Bookings */}

        <Route
          path="/provider/bookings"
          element={
            <ProtectedRoute roles={["provider"]}>
              <ProviderBookings />
            </ProtectedRoute>
          }
        />

        {/* ========================================
            Admin Routes
        ======================================== */}

        {/* Admin Dashboard */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Users */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Providers */}

        <Route
          path="/admin/providers"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Providers />
            </ProtectedRoute>
          }
        />

        {/* Bookings */}

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Bookings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

