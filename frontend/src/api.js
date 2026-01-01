import axios from "axios";

/**
 * Axios base instance
 * Backend base URL
 */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/**
 * Automatically attach JWT token to every request
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   AUTH APIs
============================ */
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

/* ============================
   PATIENT APIs
============================ */
export const applyAsDoctor = () =>
  API.post("/doctor/apply");

export const getDoctorAvailability = (doctorId) =>
  API.get(`/availability/doctor/${doctorId}`);

export const bookAppointment = (data) =>
  API.post("/appointment/book", data);

export const getPatientAppointments = () =>
  API.get("/appointment/patient");

export const cancelAppointment = (appointmentId) =>
  API.post("/appointment/cancel", { appointmentId });

/* ============================
   DOCTOR APIs
============================ */
export const addAvailability = (data) =>
  API.post("/availability/add", data);

export const getDoctorAvailabilitySelf = () =>
  API.get("/availability/my");

export const getDoctorAppointments = () =>
  API.get("/appointment/doctor");

export const updateAppointmentStatus = (data) =>
  API.post("/appointment/update-status", data);

/* ============================
   ADMIN APIs
============================ */
export const getAdminStats = () =>
  API.get("/admin/stats");

export const getDoctorApplications = () =>
  API.get("/doctor/applications");

export const updateDoctorStatus = (data) =>
  API.post("/doctor/update-status", data);

export default API;
