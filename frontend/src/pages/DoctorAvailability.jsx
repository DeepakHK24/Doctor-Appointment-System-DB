import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorAvailability, bookAppointment } from "../services/api";

export default function DoctorAvailability() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await getDoctorAvailability(doctorId);
      setSlots(res.data);
    } catch (err) {
      alert("Failed to load availability");
    }
  };

  const handleBook = async (slotId) => {
    try {
      await bookAppointment({ doctorId, slotId });
      alert("Appointment booked");
      navigate("/patient/appointments");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Doctor Availability</h2>

      {slots.length === 0 && <p>No slots available</p>}

      {slots.map((slot) => (
        <div key={slot._id}>
          <span>{slot.date} - {slot.time}</span>
          <button onClick={() => handleBook(slot._id)}>Book</button>
        </div>
      ))}
    </div>
  );
}
