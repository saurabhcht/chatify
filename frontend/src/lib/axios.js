import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://chatify-backend-nwgb.onrender.com/api",
//   withCredentials: true,
// });


export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://chatify-backend-nwgb.onrender.com/api",
  withCredentials: true,
});

// ✅ THIS IS MISSING — ADD IT
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

