http://localhost:5000/api

POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

POST /api/auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
Authorization: Bearer <JWT_TOKEN>

POST /api/doctor/apply

GET /api/availability/doctor/:doctorId

POST /api/appointment/book
{
  "doctorId": "doctorId",
  "availabilityId": "availabilityId"
}

GET /api/appointment/patient

POST /api/appointment/cancel
{
  "appointmentId": "appointmentId"
}

POST /api/appointment/reschedule
{
  "appointmentId": "appointmentId",
  "newAvailabilityId": "newAvailabilityId"
}

POST /api/availability/add
{
  "date": "2026-01-05",
  "startTime": "10:00",
  "endTime": "11:00"
}

GET /api/availability/my

GET /api/appointment/doctor

POST /api/appointment/update-status
{
  "appointmentId": "appointmentId",
  "status": "approved | completed | cancelled"
}

GET /api/admin/stats

GET /api/doctor/applications

POST /api/doctor/update-status
{
  "doctorId": "doctorId",
  "status": "approved | rejected"
}

GET /api/notification
POST /api/notification/read
{
  "notificationId": "notificationId"
}

