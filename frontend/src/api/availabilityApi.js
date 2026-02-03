import api from "./axios";

export const addAvailability = (data) =>
  api.post("/availability/add", data);

export const getDoctorAvailability = (doctorId) =>
  api.get(`/availability/${doctorId}`);
