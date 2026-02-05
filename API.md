# Doctor Appointment Booking System – API Documentation

## Base URL
http://localhost:5000

## Authentication
All protected APIs require a JWT token in the header:

Authorization: Bearer <JWT_TOKEN>

---

## 1. Authentication APIs

### Register User
POST /api/auth/register

Request Body:
{
  "name": "User Name",
  "email": "user@gmail.com",
  "password": "password"
}

---

### Login User
POST /api/auth/login

Response:
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "userId",
    "role": "patient | doctor | admin"
  }
}

---

## 2. Doctor APIs

### Apply as Doctor
POST /api/doctor/apply

Request Body:
{
  "specialization": "Cardiologist",
  "experience": 5
}

---

### Get All Approved Doctors
GET /api/doctor/all

---

## 3. Admin APIs

### Get Doctor Applications
GET /api/admin/doctors

---

### Approve / Reject Doctor
POST /api/admin/doctor/status

Request Body:
{
  "doctorId": "doctorId",
  "status": "approved | rejected"
}

---

## 4. Availability APIs

### Add Availability (Doctor)
POST /api/availability/add

Request Body:
{
  "date": "2025-02-01",
  "time": "10:00 AM"
}

---

### Get Doctor Availability
GET /api/availability/:doctorId

---

## 5. Appointment APIs

### Book Appointment (Patient)
POST /api/appointment/book

Request Body:
{
  "doctorId": "doctorId",
  "availabilityId": "availabilityId"
}

---

### Update Appointment Status (Doctor)
POST /api/appointment/status

Request Body:
{
  "appointmentId": "appointmentId",
  "status": "approved | completed | cancelled"
}

---

## 6. Dashboard APIs

### Patient Dashboard
GET /api/dashboard/patient

---

### Doctor Dashboard
GET /api/dashboard/doctor

---

### Admin Dashboard
GET /api/dashboard/admin

---

## 7. Appointment History & Analytics

### Patient Appointment History
GET /api/history/patient

Optional Query Params:
?status=completed
?fromDate=2025-01-01&toDate=2025-12-31

---

### Doctor Appointment History
GET /api/history/doctor

---

### Appointment Analytics
GET /api/history/analytics

Response:
{
  "total": 10,
  "completed": 5,
  "cancelled": 2,
  "upcoming": 3
}

---

## 8. Notification APIs

### Get Notifications
GET /api/notification

---

### Mark Notification as Read
POST /api/notification/read

Request Body:
{
  "notificationId": "notificationId"
}

---

## Authorization Rules

Patient:
- Auth, Doctor list, Availability, Book appointment, History, Dashboard, Notifications

Doctor:
- Availability, Appointment status update, History, Dashboard, Notifications

Admin:
- Doctor approval, Admin dashboard
