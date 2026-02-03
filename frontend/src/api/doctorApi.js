import api from "./axios";

export const getApprovedDoctors = () =>
  api.get("/doctor/all");

export const applyDoctor = (data) =>
  api.post("/doctor/apply", data);
