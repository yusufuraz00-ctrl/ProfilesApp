import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (!err.response) throw new Error("Network Error");
    return Promise.reject(err);
  }
);