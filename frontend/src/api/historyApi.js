import api from "./axios";

export const getPatientHistory = () =>
  api.get("/history/patient");

export const getDoctorHistory = () =>
  api.get("/history/doctor");
