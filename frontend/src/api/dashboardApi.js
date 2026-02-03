import api from "./axios";

export const getPatientDashboard = () =>
  api.get("/dashboard/patient");

export const getDoctorDashboard = () =>
  api.get("/dashboard/doctor");

export const getAdminDashboard = () =>
  api.get("/dashboard/admin");
