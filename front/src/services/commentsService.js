import apiClient from "./apiService";

export const getCommentsByPost = async (topicId, postId) => {
    try {
        const response = await apiClient.get(`/topics/${topicId}/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error("Error in getCommentsByPost:", error.message || error);
        throw new Error("Failed to fetch comments");
    }
};

export const createComment = async (topicId, postId, data) => {
    try {
        const response = await apiClient.post(
            `/topics/${topicId}/posts/${postId}/comments`,
            JSON.stringify({ content: data.content }), // Use 'content' instead of 'body'
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating comment:", error.response?.data || error.message);
        throw new Error("Failed to create comment");
    }
};

export const updateComment = async (topicId, postId, commentId, data) => {
    try {
        const payload = { content: data.content }; // Ensure correct field
        console.log("Sending payload:", payload); // Debugging payload

        const response = await apiClient.put(
            `/topics/${topicId}/posts/${postId}/comments/${commentId}`,
            payload, // Axios automatically serializes objects to JSON
            {
                headers: {
                    "Content-Type": "application/json", // Set JSON Content-Type
                },
            }
        );
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error.response?.data || error.message || error);
        throw new Error("Failed to update comment");
    }
};

export const deleteComment = async (topicId, postId, commentId) => {
    try {
        const response = await apiClient.delete(`/topics/${topicId}/posts/${postId}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error.message || error);
        throw new Error("Failed to delete comment");
    }
};