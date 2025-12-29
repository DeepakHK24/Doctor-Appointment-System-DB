import React, { useState } from "react";
import API from "../services/api";

const ApplyDoctor = () => {
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/doctor/apply",
        { specialization, experience },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Doctor application submitted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Apply as Doctor</h2>

      <form onSubmit={handleApply}>
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyDoctor;
