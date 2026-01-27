import { useEffect, useState } from "react";
import { getPatientAppointments } from "../services/api";
import {
  getMyAppointments,
  cancelAppointment,
} from "../services/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getPatientAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      alert("Appointment cancelled");
      loadAppointments();
    } catch (err) {
      alert("Cancel failed");
    }
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
            Time: {a.time} <br />
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
