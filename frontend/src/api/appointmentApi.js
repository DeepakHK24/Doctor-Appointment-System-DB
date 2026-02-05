import axios from "./axios";

/* BOOK appointment */
export const bookAppointment = (data) => {
  return axios.post("/appointments", data);
};

/* DOCTOR: get appointments */
export const getDoctorAppointments = () => {
  return axios.get("/doctor/appointments");
};

/* PATIENT: get appointments */
export const getPatientAppointments = () => {
  return axios.get("/patient/appointments");
};

/* UPDATE appointment status */
export const updateAppointmentStatus = (id, status) => {
  return axios.put(`/appointments/${id}`, { status });
};

/* CANCEL appointment */
export const cancelAppointment = (id) => {
  return axios.delete(`/appointments/${id}`);
};
