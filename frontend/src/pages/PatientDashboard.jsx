import React, { useEffect, useState } from "react";
import { getPatientDashboard } from "../services/api";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getPatientDashboard();
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Patient Dashboard</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((a) => (
          <div key={a._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
            <p>Doctor: {a.doctor?.name}</p>
            <p>Date: {a.date}</p>
            <p>Time: {a.time}</p>
            <p>Status: {a.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
