import axios from "axios";

// const baseUrl = "http://localhost:8080/api/v1";
const baseUrl = "https://server-jurnal-mengajar.vercel.app/api/v1";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
