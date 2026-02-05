import axios from "./axios";

/* GET doctor applications (for admin) */
export const getDoctorApplications = () => {
  return axios.get("/admin/doctor-applications");
};

/* APPROVE / REJECT doctor */
export const updateDoctorStatus = (doctorId, status) => {
  return axios.put(`/admin/doctors/${doctorId}`, { status });
};

/* GET approved doctors (for patients) */
export const getApprovedDoctors = () => {
  return axios.get("/doctors/approved");
};
