import React, { useEffect, useState } from "react";
import { getDoctorDashboard } from "../api/dashboardApi";
import { updateAppointmentStatus } from "../api/appointmentApi";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getDoctorDashboard();
      setAppointments(res.data.appointments || []);
    } catch {
      alert("Failed to load doctor dashboard");
    }
  };

  const handleApprove = async (id) => {
    await updateAppointmentStatus(id, "approved");
    loadData();
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>

      {appointments.length === 0 && <p>No appointments</p>}

      {appointments.map((a) => (
        <div key={a._id} style={{ marginBottom: "10px" }}>
          <p>
            Patient: {a.patient?.name} <br />
            Date: {a.date} <br />
            Status: {a.status}
          </p>

          {a.status === "pending" && (
            <button onClick={() => handleApprove(a._id)}>
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboard;
