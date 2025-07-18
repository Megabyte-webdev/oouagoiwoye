import axios from "axios";

const API = axios.create({
    baseURL: `${
        import.meta.env.VITE_BASE_URL ||
        "https://oouweb.perfecthomesdeveloperlimited.com/api/oouweb"
    }`, // "/api",
    timeout: 60000,
    //withCredentials: true, // if your backend uses cookies for auth
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add auth header if token present in cookies
API.interceptors.request.use((config) => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;
