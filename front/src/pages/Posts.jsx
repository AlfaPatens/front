import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostsByTopic, createPost, updatePost, deletePost } from "../services/postsService";
import { getTopics } from "../services/topicsService";
import { getUserNameById } from "../services/authService"; // Import the username function


const PostsContainer = styled.main`
    margin-top: 3rem;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: white;
  }

  ul li p:last-of-type {
    font-size: 0.9rem;
    color: #aaa;
    margin-top: 0.5rem;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 2rem;

    input,
    textarea {
      width: 100%;
      max-width: 500px;
      padding: 0.75rem;
      border: 1px solid #555;
      border-radius: 5px;
      background-color: #333;
      color: white;
      font-size: 1rem;
    }

    textarea {
      height: 80px;
      resize: none;
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.5rem;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;

        &.create {
          background-color: #28a745;
          &:hover {
            background-color: #218838;
          }
        }

        &.cancel {
          background-color: #6c757d;
          &:hover {
            background-color: #5a6268;
          }
        }
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 1rem auto;
      background-color: #1f1f1f;
      padding: 1.5rem;
      border-radius: 8px;
      max-width: 500px;
      text-align: left;

      h3 {
        margin: 0 0 1rem;
        color: #00aced;
        cursor: pointer;
      }

      p {
        margin-bottom: 1rem;
        color: #ccc;
      }

      .buttons {
        display: flex;
        gap: 1rem;

        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;

          &.edit {
            background-color: #ffc107;
            &:hover {
              background-color: #e0a800;
            }
          }

          &.delete {
            background-color: #dc3545;
            &:hover {
              background-color: #c82333;
            }
          }
        }
      }
    }
  }
`;

export default function PostsPage() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: "", body: "" });
    const [editingPost, setEditingPost] = useState(null);
    const [topicName, setTopicName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPostsByTopic(topicId);

                // Fetch usernames for posts
                const postsWithUsernames = await Promise.all(
                    data.$values.map(async (post) => {
                        const userName = await getUserNameById(post.userId);
                        return { ...post, userName };
                    })
                );
                setPosts(postsWithUsernames);

                // Fetch topic name
                const topics = await getTopics();
                const currentTopic = topics.find((t) => t.id === parseInt(topicId));
                setTopicName(currentTopic?.title || "Unknown Topic");
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [topicId]);

    const handleCreate = async () => {
        if (!newPost.title || !newPost.body) {
            alert("Title and Body are required");
            return;
        }

        try {
            // Create the new post
            const createdPost = await createPost(topicId, newPost);

            // Fetch the username for the new post
            const userName = await getUserNameById(createdPost.userId);

            // Add the new post with the username to the state
            setPosts([...posts, { ...createdPost, userName }]);
            setNewPost({ title: "", body: "" });
        } catch (err) {
            console.error("Error creating post:", err);
            setError("Failed to create post.");
        }
    };

    const handleUpdate = async (postId) => {
        try {
            // Update the post body
            const updatedPost = await updatePost(topicId, postId, { body: editingPost.body });

            // Fetch the username for the updated post
            const userName = await getUserNameById(updatedPost.userId);

            // Update the posts state with the username
            setPosts(posts.map((p) =>
                p.id === postId ? { ...updatedPost, userName } : p
            ));
            setEditingPost(null); // Exit edit mode
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(topicId, postId);
            setPosts(posts.filter((p) => p.id !== postId));
        } catch (err) {
            console.error("Error deleting post:", err);
            setError("Failed to delete post.");
        }
    };

    return (
        <PostsContainer>
            <h2>Posts for Topic: {topicName}</h2>

            {/* Create Post Form */}
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Post Body"
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                ></textarea>
                <div className="button-group">
                    <button className="create" onClick={handleCreate}>
                        Create Post
                    </button>
                </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Posts List */}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {editingPost?.id === post.id ? (
                            // Edit mode
                            <div className="form-container">
                                <input
                                    type="text"
                                    value={post.title}
                                    disabled
                                    style={{ backgroundColor: "#444", color: "#999", cursor: "not-allowed" }}
                                />
                                <textarea
                                    value={editingPost.body}
                                    onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                                    placeholder="Edit Post Body"
                                ></textarea>
                                <div className="button-group">
                                    <button className="create" onClick={() => handleUpdate(post.id)}>
                                        Save
                                    </button>
                                    <button className="cancel" onClick={() => setEditingPost(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // View mode
                            <>
                                <h3
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/topics/${topicId}/posts/${post.id}`)}
                                >
                                    {post.title}
                                </h3>
                                <p>{post.body}</p>
                                <p style={{ fontSize: "0.9rem", color: "#aaa", marginTop: "0.5rem" }}>
                                    Created by: {post.userName || "Unknown"}
                                </p>
                                <div className="buttons">
                                    <button
                                        className="edit"
                                        onClick={() => setEditingPost({ id: post.id, body: post.body })}
                                    >
                                        Edit
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(post.id)}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </PostsContainer>
    );
}
