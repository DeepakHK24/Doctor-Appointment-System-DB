import axios from "axios";

/* ---------------------------
   AXIOS INSTANCE
---------------------------- */

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ---------------------------
   ADD TOKEN TO EVERY REQUEST
---------------------------- */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------------------
   AUTH APIs
---------------------------- */

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerUser = (data) =>
  api.post("/auth/register", data);

/* ---------------------------
   PATIENT APIs
---------------------------- */

// Get all approved doctors
export const getDoctors = () =>
  api.get("/doctor/approved");

// Get doctor availability
export const getDoctorAvailability = (doctorId) =>
  api.get(`/availability/doctor/${doctorId}`);


// Book appointment
export const bookAppointment = (data) =>
  api.post("/appointment/book", data);

// Patient appointments
export const getPatientAppointments = () =>
  api.get("/appointment/patient");

// Cancel appointment
export const cancelAppointment = (appointmentId) =>
  api.post("/appointment/cancel", { appointmentId });

/* ---------------------------
   DOCTOR APIs
---------------------------- */

// Doctor availability
export const addAvailability = (data) =>
  api.post("/availability/add", data);

export const getMyAvailability = () =>
  api.get("/availability/my");

// Doctor appointments
export const getDoctorAppointments = () =>
  api.get("/appointment/doctor");

export const updateAppointmentStatus = (data) =>
  api.post("/appointment/update-status", data);

/* ---------------------------
   ADMIN APIs
---------------------------- */

export const getDoctorApplications = () =>
  api.get("/doctor/applications");

export const updateDoctorStatus = (data) =>
  api.post("/doctor/update-status", data);

export const getAdminStats = () =>
  api.get("/admin/stats");


export default api;
