import axios from "axios";

/**
 * Axios instance
 */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/**
 * Attach JWT token to every request
 */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= AUTH ================= */

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

/* ================= PATIENT ================= */

export const getPatientAppointments = () =>
  API.get("/appointment/patient");

export const bookAppointment = (data) =>
  API.post("/appointment/book", data);

export const cancelAppointment = (id) =>
  API.post("/appointment/cancel", { appointmentId: id });

/* ================= DOCTOR ================= */

export const getDoctorAppointments = () =>
  API.get("/appointment/doctor");

export const updateAppointmentStatus = (id, status) =>
  API.post("/appointment/update-status", {
    appointmentId: id,
    status,
  });

export const addAvailability = (data) =>
  API.post("/availability/add", data);

export const getMyAvailability = () =>
  API.get("/availability/my");

/* ================= ADMIN ================= */

export const getAdminStats = () =>
  API.get("/admin/stats");

export const getDoctorApplications = () =>
  API.get("/doctor/applications");

export const updateDoctorStatus = (id, status) =>
  API.post("/doctor/update-status", {
    doctorId: id,
    status,
  });

export default API;
