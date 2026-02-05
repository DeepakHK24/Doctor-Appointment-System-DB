import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorAvailability } from "../api/availabilityApi";
import { bookAppointment } from "../api/appointmentApi";

export default function DoctorAvailability() {
  const { doctorId } = useParams();        // doctor id from URL
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);

  // 🔹 FETCH AVAILABILITY WHEN PAGE LOADS
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await getDoctorAvailability(doctorId);
        setSlots(res.data);
      } catch (error) {
        console.error("Error fetching availability", error);
      }
    };

    fetchAvailability();
  }, [doctorId]);

  // 🔹 BOOK APPOINTMENT FUNCTION
  const handleBookAppointment = async (availabilityId) => {
    try {
      // ✅ THIS IS EXACTLY WHERE YOUR LINE GOES
      await bookAppointment({ doctorId, availabilityId });

      alert("Appointment booked successfully");
      navigate("/patient"); // go back to patient dashboard
    } catch (error) {
      alert("Failed to book appointment");
    }
  };

  return (
    <div>
      <h2>Doctor Availability</h2>

      {slots.length === 0 && <p>No slots available</p>}

      {slots.map((slot) => (
        <div key={slot._id} style={{ marginBottom: "10px" }}>
          <span>
            {slot.date} - {slot.time}
          </span>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleBookAppointment(slot._id)}
          >
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
}
