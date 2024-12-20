import { jwtDecode } from "jwt-decode";

export const getLoggedInUsername = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const username =
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User";
            return username;
        } catch (err) {
            console.error("Failed to decode token:", err);
        }
    }
    return null;
};
