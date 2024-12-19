import apiClient from "./apiService";

export const getPostsByTopic = async (topicId) => {
    try {
        const response = await apiClient.get(`/topics/${topicId}/posts`);
        return response.data;
    } catch (error) {
        console.error("Error in getPostsByTopic:", error.message || error);
        throw new Error("Failed to fetch posts");
    }
};

export const createPost = async (topicId, data) => {
    try {
        const response = await apiClient.post(`/topics/${topicId}/posts`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error.message || error);
        throw new Error("Failed to create post");
    }
};

export const updatePost = async (topicId, postId, data) => {
    try {
        const response = await apiClient.put(`/topics/${topicId}/posts/${postId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error.message || error);
        throw new Error("Failed to update post");
    }
};

export const deletePost = async (topicId, postId) => {
    try {
        const response = await apiClient.delete(`/topics/${topicId}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting post:", error.message || error);
        throw new Error("Failed to delete post");
    }
};