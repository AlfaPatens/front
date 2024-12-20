import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostsByTopic, createPost, updatePost, deletePost } from "../services/postsService";
import { getTopics } from "../services/topicsService";
import { getUserNameById } from "../services/authService"; // Import the username function
import { getLoggedInUsername } from "../services/authUtils"; // Import utility function

const PostsContainer = styled.main`
  margin-top: 3rem;
  text-align: center;

  h2 {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    color: #f8f9fa;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    background: #212529;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    input,
    textarea {
      width: 100%;
      padding: 1rem;
      background-color: #343a40;
      border: 1px solid #495057;
      color: #f8f9fa;
      border-radius: 8px;
      font-size: 1rem;
    }

    textarea {
      height: 100px;
      resize: none;
    }

    button {
      align-self: flex-end;
      padding: 0.75rem 1.5rem;
      background-color: #17c671;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.3s ease, background-color 0.3s ease;

      &:hover {
        background-color: #12a358;
        transform: scale(1.05);
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      background-color: #212529;
      padding: 1.5rem;
      margin: 1rem auto;
      border-radius: 12px;
      max-width: 600px;
      text-align: left;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      h3 {
        margin: 0 0 1rem;
        color: #00aced;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
          color: #38bdf8;
        }
      }

      p {
        color: #dee2e6;
        margin: 0.5rem 0;
        line-height: 1.4;
      }

      .creator {
        font-size: 0.9rem;
        color: #adb5bd;
        margin-top: 0.8rem;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;

        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;

          &.edit {
            background-color: #ffc107;
            color: #212529;

            &:hover {
              background-color: #e0a800;
              transform: scale(1.05);
            }
          }

          &.delete {
            background-color: #dc3545;
            color: white;

            &:hover {
              background-color: #c82333;
              transform: scale(1.05);
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
    const currentUserName = getLoggedInUsername(); // Get the logged-in username
    //const [topicId, setTopicId] = useState("");
    const adminUsername = "admin";

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
                //setTopicId(currentTopic?.id || "Unknown Topic");
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/topics/${topicId}/posts/${post.id}`);
                                    }}
                                >
                                    {post.title}
                                </h3>
                                <p>{post.body}</p>
                                <p style={{ fontSize: "0.9rem", color: "#aaa", marginTop: "0.5rem" }}>
                                    Created by: {post.userName || "Unknown"}
                                </p>
                                    {(post.userName === currentUserName || currentUserName === adminUsername) && (
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
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </PostsContainer>
    );
}
