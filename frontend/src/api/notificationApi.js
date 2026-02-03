import api from "./axios";

export const getNotifications = () =>
  api.get("/notification");

export const markNotificationRead = (notificationId) =>
  api.post("/notification/read", { notificationId });
