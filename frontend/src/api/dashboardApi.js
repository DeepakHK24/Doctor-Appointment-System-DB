import axios from "./axios";

/* ADMIN DASHBOARD */
export const getAdminDashboard = () => {
  return axios.get("/admin/dashboard");
};

/* DOCTOR DASHBOARD */
export const getDoctorDashboard = () => {
  return axios.get("/doctor/dashboard");
};

/* PATIENT DASHBOARD */
export const getPatientDashboard = () => {
  return axios.get("/patient/dashboard");
};
