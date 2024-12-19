import apiClient from "./apiService";

export const login = async (credentials) => {
    const response = await apiClient.post("/login", credentials);
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
};

export const register = async (userData) => {
    const response = await apiClient.post("/accounts", userData);
    return response.data;
};

export const logout = async () => {
    await apiClient.post("/logout");
    localStorage.removeItem("token");
};

export const getUserNameById = async (userId) => {
    try {
        const response = await apiClient.get(`/accounts/${userId}`);
        return response.data.userName; // Ensure correct property casing
    } catch (error) {
        return "Unknown";
    }
};