import React, { useEffect, useState } from "react";
import {
  getAdminStats,
  getDoctorApplications,
  updateDoctorStatus,
} from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const statsRes = await getAdminStats();
      const appsRes = await getDoctorApplications();

      setStats(statsRes.data);
      setApplications(appsRes.data);
    } catch (err) {
      alert("Failed to load admin data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoctorStatus(id, status);
      fetchData();
    } catch (err) {
      alert("Action failed");
    }
  };

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      {/* STATS */}
      {stats && (
        <div className="stats">
          <p>Total Users: {stats.users}</p>
          <p>Total Doctors: {stats.doctors}</p>
          <p>Total Appointments: {stats.appointments}</p>
        </div>
      )}

      {/* DOCTOR APPLICATIONS */}
      <h3>Doctor Applications</h3>

      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.status}</td>
                <td>
                  {doc.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(doc._id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(doc._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
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

export default AdminDashboard;
