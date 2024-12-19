import axios from "axios";
import API_BASE_URL from "../config";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Include Authorization token if available
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // JWT token stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;