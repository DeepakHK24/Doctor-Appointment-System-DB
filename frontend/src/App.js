import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDoctorAvailability,
  bookAppointment,
} from "../services/api";

export default function DoctorAvailability() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch availability when page loads
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await getDoctorAvailability(doctorId);
        setSlots(res.data);
      } catch (err) {
        alert("Failed to load availability");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [doctorId]);

  // 🔹 Book appointment (BUTTON CLICK)
  const handleBook = async (availabilityId) => {
    try {
      await bookAppointment({
        doctorId,
        availabilityId,
      });

      alert("Appointment booked successfully");
      navigate("/patient");
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (loading) return <h3>Loading...</h3>;

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
            onClick={() => handleBook(slot._id)}
          >
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
}
