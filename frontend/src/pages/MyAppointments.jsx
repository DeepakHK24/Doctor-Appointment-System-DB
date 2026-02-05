import { useEffect, useState } from "react";
import { getPatientDashboard } from "../api/dashboardApi";
import { updateAppointmentStatus } from "../api/appointmentApi";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getPatientDashboard();
      setAppointments(res.data.appointments || []);
    } catch {
      alert("Failed to load appointments");
    }
  };

  const handleCancel = async (id) => {
    await updateAppointmentStatus(id, "cancelled");
    loadAppointments();
  };

  return (
    <div>
      <h2>My Appointments</h2>

      {appointments.length === 0 && <p>No appointments</p>}

      {appointments.map((a) => (
        <div key={a._id} style={{ marginBottom: "10px" }}>
          <p>
            Doctor: {a.doctor?.name} <br />
            Date: {a.date} <br />
            Status: {a.status}
          </p>

          {a.status === "pending" && (
            <button onClick={() => handleCancel(a._id)}>
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
