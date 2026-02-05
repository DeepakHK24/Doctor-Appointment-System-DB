import api from "./axios";

export const getDoctorAvailability = (doctorId) =>
  api.get(`/availability/${doctorId}`);
