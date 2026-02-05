import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApprovedDoctors } from "../api/doctorApi";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // 👇 THIS IS WHERE YOUR CODE GOES
        const res = await getApprovedDoctors();
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Available Doctors</h2>

      {doctors.map((doctor) => (
        <div key={doctor._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h4>{doctor.user.name}</h4>
          <p>Specialization: {doctor.specialization}</p>

          <button
            onClick={() => navigate(`/doctor/${doctor._id}/availability`)}
          >
            View Availability
          </button>
        </div>
      ))}
    </div>
  );
}
