import React from "react";
import { Link } from "react-router-dom";
import { getDoctors } from "../services/api";


<Link to="/patient/appointments">My Appointments</Link>

import {
  getPatientAppointments,
  cancelAppointment,
} from "../services/api";



const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchAppointments = async () => {
    try {
      const { data } = await getPatientAppointments();
      setAppointments(data);
    } catch (err) {
      setError("Failed to load appointments");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      fetchAppointments(); // refresh list
    } catch (err) {
      alert("Unable to cancel appointment");
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <h2>Patient Dashboard</h2>

      {appointments.length === 0 ? (
        <p>No appointments booked</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctor?.name}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "pending" && (
                    <button
                      onClick={() => handleCancel(appt._id)}
                    >
                      Cancel
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

export default PatientDashboard;
