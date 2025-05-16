import axios from "axios";

export const axiosClient = ({ token, multiMedia = false }) => {
  const contentType = multiMedia
    ? "multipart/form-data"
    : "application/json;charset=utf-8";

  const headers = {
    "Content-Type": contentType,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const API = axios.create({
    baseURL: "https://api.oouweb.site/api/oouweb",
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  return API;
};
