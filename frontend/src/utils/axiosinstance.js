import axios from "axios";

// Create an Axios instance
const API = axios.create({
baseURL: "https://api.oouweb.site/api/oouweb/",
timeout: 60000,
withCredentials: true,
});

API.interceptors.request.use(
(config) => {
const authToken = document.cookie
.split("; ")
.find((row) => row\.startsWith("authToken="))
?.split("=")\[1];

if (authToken) {
  config.headers["Authorization"] = `Bearer ${authToken}`; 
}

return config; 


},
(error) => {
return Promise.reject(error);
}
);

export default API;
