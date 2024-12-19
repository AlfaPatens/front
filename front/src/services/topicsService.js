import apiClient from "./apiService";

export async function getTopics() {
    try {
        const response = await apiClient.get("/topics");
        if (response.data && response.data.$values) {
            return response.data.$values; // Extract and return the topics array
        } else {
            throw new Error("Unexpected response structure");
        }
    } catch (error) {
        console.error("Error in getTopics:", error.message || error);
        throw new Error("Failed to fetch topics");
    }
}

export const createTopic = async (data) => {
    try {
        const response = await apiClient.post("/topics", data);
        return response.data;
    } catch (error) {
        console.error("Error creating topic:", error.message || error);
        throw new Error("Failed to create topic");
    }
};

export const updateTopic = async (id, data) => {
    try {
        const response = await apiClient.put(`/topics/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating topic:", error.message || error);
        throw new Error("Failed to update topic");
    }
};

export const deleteTopic = async (id) => {
    try {
        const response = await apiClient.delete(`/topics/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting topic:", error.message || error);
        throw new Error("Failed to delete topic");
    }
};