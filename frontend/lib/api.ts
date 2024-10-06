import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const refreshTokenClient = axios.create(options);
refreshTokenClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

export default API;
