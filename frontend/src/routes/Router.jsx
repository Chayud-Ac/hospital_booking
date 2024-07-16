import Home from "../pages/Home";
import Service from "../pages/Service";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import AdminDashboard from "../Dashboard/admin/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import TransitionWrapper from "./TransitionWrapper";

const Router = () => {
  return (
    <TransitionWrapper key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/service" element={<Service />} />
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoute allowRoles={["user", "admin", "patient"]}>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoute allowRoles={["doctor", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile/me"
          element={
            <ProtectedRoute allowRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </TransitionWrapper>
  );
};

export default Router;
