import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientDashboard } from "../api/dashboardApi";

const PatientDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await getPatientDashboard();
      setDashboard(res.data);
    };
    fetchDashboard();
  }, []);

  if (!dashboard) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Patient Dashboard</h2>
      <p>Welcome, {dashboard.user?.name}</p>
      <p>Total Appointments: {dashboard.totalAppointments}</p>
      <p>Upcoming: {dashboard.upcomingAppointments}</p>

      <button onClick={() => navigate("/doctors")}>
        Book Appointment
      </button>
    </div>
  );
};

export default PatientDashboard;
