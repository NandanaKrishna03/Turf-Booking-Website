
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` // or sessionStorage
    }
  });
  