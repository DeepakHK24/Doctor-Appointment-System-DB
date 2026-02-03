import api from "./axios";

export const bookAppointment = (data) =>
  api.post("/appointment/book", data);

export const updateAppointmentStatus = (data) =>
  api.post("/appointment/status", data);
