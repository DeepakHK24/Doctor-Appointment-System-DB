const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));
app.use("/api/appointment", require("./routes/appointmentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/notification", require("./routes/notificationRoutes"));

// ERROR HANDLER (MUST BE LAST)
app.use(errorHandler);

// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
