import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/tenant/Dashboard";
import Profiling from "./pages/user/Profiling";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import {
  AuthenticatedRoute,
  NonAuthenticatedRoute,
} from "./shared/router/RouteGuards";
import HomeOrDashboard from "./shared/router/HomeOrDashboard";
import DashboardSideBar from "./components/sidebar/DashboardSideBar";
import CategoryArea from "./pages/tenant/CategoryArea";
import ChangePassword from "./pages/user/ChangePassword";
import PropertyEdit from "./pages/tenant/property/propertyDetails/PropertyEdit";
import PropertyAdd from "./pages/tenant/property/PropertyAdd";
import PropertyLayout from "./components/layouts/PropertyLayout";
import PropertyRooms from "./pages/tenant/property/propertyDetails/PropertyRooms";
import PropertyAvailability from "./pages/tenant/property/propertyDetails/PropertyAvailability";
import PropertySpecialPrice from "./pages/tenant/property/propertyDetails/PropertySpecialPrice";
import VerifyEmail from "./pages/user/VerifyEmail";
import AvailableProperty from "./pages/user/property/AvailableProperty";
import DetailProperty from "./pages/user/property/DetailProperty";
import BookingProperty from "./pages/user/userTransaction/Booking";
import PaymentProof from "./pages/user/userTransaction/PaymentProof";
import OrderList from "./pages/user/userTransaction/OrderList";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TenantOrderList from "./pages/tenant/TenantOrderList";
import VerifyPayment from "./pages/user/userTransaction/VerifyPayment";
import PersistLogin from "./pages/PersistLogin";
import TenantTabelReport from "./pages/tenant/TenantTabelReport";
import ReportByCalendar from "./pages/tenant/ReportByCalendar";
import Debug from "./pages/Debug";

function App() {
  return (
    <Routes>
      {/* Route for the base path to decide between Home and Dashboard */}
      <Route element={<PersistLogin />}>
        <Route path="/" element={<DashboardSideBar />}>
          <Route index element={<HomeOrDashboard />} />
        </Route>
        <Route path="/debug" element={<Debug />} />

        {/* USER Authenticated Routes */}
        <Route path="profile" element={<AuthenticatedRoute roles={["USER"]} />}>
          <Route index element={<Profiling />} />
        </Route>
        <Route
          path="change-password"
          element={<AuthenticatedRoute roles={["USER"]} />}
        >
          <Route index element={<ChangePassword />} />
        </Route>
        <Route
          path="/verify-email/:otp/:email"
          element={<AuthenticatedRoute roles={["USER"]} />}
        >
          <Route index element={<VerifyEmail />} />
        </Route>
        <Route path="/property">
          <Route index element={<AvailableProperty />} />
        </Route>
        <Route path="/property/:id">
          <Route index element={<DetailProperty />} />
        </Route>
        <Route
          path="/booking"
          element={<AuthenticatedRoute roles={["USER"]} />}
        >
          <Route index element={<BookingProperty />} />
        </Route>
        <Route
          path="/paymentproof/:booking_code"
          element={<AuthenticatedRoute roles={["USER"]} />}
        >
          <Route index element={<PaymentProof />} />
        </Route>
        <Route
          path="/orderlist"
          element={<AuthenticatedRoute roles={["USER"]} />}
        >
          <Route index element={<OrderList />} />
        </Route>
        <Route
          path="/verify-payment/:verify_code"
          element={<AuthenticatedRoute roles={["USER"]} />}
        >
          <Route index element={<VerifyPayment />} />
        </Route>

        {/* TENANT Authenticated Routes */}
        <Route
          path="/my-property"
          element={<AuthenticatedRoute roles={["TENANT"]} />}
        >
          <Route path=":propertyId" element={<DashboardSideBar />}>
            <Route element={<PropertyLayout />}>
              <Route index element={<PropertyEdit />} />
              <Route path="rooms" element={<PropertyRooms />} />
              <Route path="availability" element={<PropertyAvailability />} />
              <Route path="special-price" element={<PropertySpecialPrice />} />
            </Route>
          </Route>
          <Route path="add" element={<DashboardSideBar />}>
            <Route index element={<PropertyAdd />} />
          </Route>
        </Route>
        {/* TENANT Authenticated Routes */}
        <Route
          path="/my-property"
          element={<AuthenticatedRoute roles={["TENANT"]} />}
        >
          <Route path=":propertyId" element={<DashboardSideBar />}>
            <Route element={<PropertyLayout />}>
              <Route index element={<PropertyEdit />} />
              <Route path="rooms" element={<PropertyRooms />} />
              <Route path="availability" element={<PropertyAvailability />} />
              <Route path="special-price" element={<PropertySpecialPrice />} />
            </Route>
          </Route>
          <Route path="add" element={<DashboardSideBar />}>
            <Route index element={<PropertyAdd />} />
          </Route>
        </Route>

        <Route
          path="category-area"
          element={<AuthenticatedRoute roles={["TENANT"]} />}
        >
          <Route path="*" element={<DashboardSideBar />}>
            <Route index element={<CategoryArea />} />
          </Route>
        </Route>

        <Route
          path="order-list"
          element={<AuthenticatedRoute roles={["TENANT"]} />}
        >
          <Route path="*" element={<DashboardSideBar />}>
            <Route index element={<TenantOrderList />} />
          </Route>
        </Route>
        <Route
          path="report-tabel"
          element={<AuthenticatedRoute roles={["TENANT"]} />}
        >
          <Route path="*" element={<DashboardSideBar />}>
            <Route index element={<TenantTabelReport />} />
          </Route>
        </Route>
        <Route
          path="reportbyCalendar"
          element={<AuthenticatedRoute roles={["TENANT"]} />}
        >
          <Route path="*" element={<DashboardSideBar />}>
            <Route index element={<ReportByCalendar />} />
          </Route>
        </Route>
      </Route>

      {/* Non-authenticated Routes */}
      <Route path="/login" element={<NonAuthenticatedRoute />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/register" element={<NonAuthenticatedRoute />}>
        <Route index element={<Register />} />
      </Route>
      <Route path="/forgot-password" element={<NonAuthenticatedRoute />}>
        <Route index element={<ForgotPassword />} />
      </Route>
      <Route path="/reset-password/:token" element={<NonAuthenticatedRoute />}>
        <Route index element={<ResetPassword />} />
      </Route>
      <Route path="/forgot-password" element={<NonAuthenticatedRoute />}>
        <Route index element={<ForgotPassword />} />
      </Route>
      <Route path="/reset-password/:token" element={<NonAuthenticatedRoute />}>
        <Route index element={<ResetPassword />} />
      </Route>
      <Route path="/verify/:token" element={<NonAuthenticatedRoute />}>
        <Route index element={<VerifyOTP />} />
      </Route>

      {/* Open Routes */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
