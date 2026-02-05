import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/dashboardApi";
import { updateDoctorStatus } from "../api/doctorApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getAdminDashboard();
      setStats(res.data.stats);
      setApplications(res.data.doctorApplications);
    } catch (err) {
      alert("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoctorStatus(id, status);
      fetchData();
    } catch {
      alert("Action failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {stats && (
        <>
          <p>Total Users: {stats.users}</p>
          <p>Total Doctors: {stats.doctors}</p>
          <p>Total Appointments: {stats.appointments}</p>
        </>
      )}

      <h3>Doctor Applications</h3>

      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.status}</td>
                <td>
                  <button onClick={() => handleStatusChange(doc._id, "approved")}>
                    Approve
                  </button>
                  <button onClick={() => handleStatusChange(doc._id, "rejected")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
