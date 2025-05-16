import axios, { AxiosInstance } from "axios";

export const axiosClient = AxiosInstance => {
  let headers;

  const contentType = multiMedia ? 'multipart/form-data' : "application/json;charset=utf-8"

  if(token){
   headers = {
      "Content-Type": contentType,
      "Authorization": `Bearer ${token}`,
    }
  } else{
    headers = {
      "Content-Type": contentType,
      // "ngrok-skip-browser-warning":"true",
    };

  }


  const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  return API;
};
