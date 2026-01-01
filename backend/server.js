const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is running");
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/appointment", require("./routes/appointmentRoutes"));
