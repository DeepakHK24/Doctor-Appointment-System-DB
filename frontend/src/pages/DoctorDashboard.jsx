import React, { useEffect, useState } from "react";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../services/api";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const { data } = await getDoctorAppointments();
      setAppointments(data);
    } catch (err) {
      setError("Failed to load appointments");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Failed to cancel appointment");
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <h2>Doctor Dashboard</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patient?.name}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(appt._id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleCancel(appt._id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {appt.status === "approved" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(appt._id, "completed")
                      }
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorDashboard;
