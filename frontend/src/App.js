import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import DoctorList from "./pages/DoctorList";
import DoctorAvailability from "./pages/DoctorAvailability";
import MyAppointments from "./pages/MyAppointments";
import DoctorAppointments from "./pages/DoctorAppointments";
import AdminDoctors from "./pages/AdminDoctors";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["patient"]}>
                <DoctorList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["patient"]}>
                <DoctorAvailability />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["patient"]}>
                <MyAppointments />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["doctor"]}>
                <DoctorAppointments />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDoctors />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
<Route
  path="/doctor/:doctorId/availability"
  element={<DoctorAvailability />}
/>
<Route
  path="/patient/appointments"
  element={<MyAppointments />}
/>

      </Routes>
    </Router>
  );
}

export default App;

