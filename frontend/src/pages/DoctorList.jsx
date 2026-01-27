import { useNavigate } from "react-router-dom";
import React from "react";

export default function DoctorList() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Doctor List
        const navigate = useNavigate();

      </h2>
      <p>This page will show all approved doctors.</p>

      <button onClick={() => navigate("/doctor-availability")}>
        View Availability
      </button>
    </div>
  );
}
