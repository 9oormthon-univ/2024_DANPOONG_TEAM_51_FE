import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceSocket = axios.create({
  baseURL: `${import.meta.env.VITE_SOCKET_BASE_URL}`,
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});
