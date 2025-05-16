import axios from "axios";

const token = document.cookie
  .split("; ")
  .find(row => row.startsWith("authToken="))
  ?.split("=")[1];

const contentType = "application/json;charset=utf-8";

const API = axios.create({
  baseURL: "https://api.oouweb.site/api/oouweb",
  headers: {
    "Content-Type": contentType,
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  timeout: 60000,
  withCredentials: false,
});

export default API;
