import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  withCredentials: true, // Ensures cookies are included in requests
});

export default apiClient;