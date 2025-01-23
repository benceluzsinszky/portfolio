import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export const axiosConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "api-key": apiKey,
  },
});
