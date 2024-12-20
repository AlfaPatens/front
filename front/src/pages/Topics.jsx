import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTopics, createTopic, updateTopic, deleteTopic } from "../services/topicsService";
import { getUserNameById } from "../services/authService";
import { getLoggedInUsername } from "../services/authUtils"; // Import utility function

const TopicsContainer = styled.main`
  margin-top: 3rem;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: white;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #555;
      border-radius: 5px;
      background-color: #333;
      color: white;
      font-size: 1rem;
    }

    textarea {
      resize: none;
      height: 80px;
    }

    button {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      h3 {
        margin: 0;
        color: #00aced;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      p {
        margin: 0.5rem 0;
        color: #ccc;
      }

      .creator {
        font-size: 0.9rem;
        color: #aaa;
        margin-top: 0.5rem;
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
          transition: background-color 0.3s;

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

export default function Topics() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTopic, setNewTopic] = useState({ title: "", description: "" });
    const [editingTopic, setEditingTopic] = useState(null);
    const currentUserName = getLoggedInUsername(); // Get the logged-in username
    const adminUsername = "admin";
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                const topicsWithUsernames = await Promise.all(
                    data.map(async (topic) => {
                        const userName = await getUserNameById(topic.userID);
                        return { ...topic, userName };
                    })
                );
                setTopics(topicsWithUsernames); // Update topics state with usernames
            } catch (err) {
                setError("Failed to fetch topics.");
            } finally {
                setLoading(false);
            }
        };
        fetchTopics();
    }, []);

    const handleCreate = async () => {
        try {
            // Create a new topic
            const created = await createTopic(newTopic);

            // Fetch the username for the userID of the created topic
            const userName = await getUserNameById(created.userID);

            // Add the username to the created topic and update state
            setTopics([...topics, { ...created, userName }]);
            setNewTopic({ title: "", description: "" });
        } catch (err) {
            console.error("Failed to create topic:", err);
            setError("Failed to create topic.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTopic(id);
            setTopics(topics.filter((t) => t.id !== id));
        } catch (err) {
            setError("Failed to delete topic.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            // Update the topic description
            const updated = await updateTopic(id, editingTopic);

            // Fetch the username for the updated topic
            const userName = await getUserNameById(updated.userID);

            // Update the topics state with the username
            setTopics(topics.map((t) =>
                t.id === id ? { ...updated, userName } : t
            ));
            setEditingTopic(null); // Exit edit mode
        } catch (err) {
            console.error("Error updating topic:", err);
        }
    };

    return (
        <TopicsContainer>
            <h2>Topics</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                ></textarea>
                <button onClick={handleCreate}>Create Topic</button>
            </div>

            {error && <div style={{ color: "red" }}>{error}</div>}
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        {editingTopic?.id === topic.id ? (
                            // EDIT MODE
                            <div className="form-container">
                                <input
                                    type="text"
                                    value={topic.title}
                                    disabled
                                    style={{
                                        backgroundColor: "#444",
                                        color: "#999",
                                        cursor: "not-allowed",
                                    }}
                                />
                                <textarea
                                    value={editingTopic.description}
                                    onChange={(e) =>
                                        setEditingTopic({ ...editingTopic, description: e.target.value })
                                    }
                                    placeholder="Edit Description"
                                ></textarea>
                                <div className="button-group">
                                    <button className="save" onClick={() => handleUpdate(topic.id)}>
                                        Save
                                    </button>
                                    <button className="cancel" onClick={() => setEditingTopic(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // VIEW MODE
                            <>
                                <h3
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/topics/${topic.id}/posts`);
                                    }}
                                >
                                    {topic.title}
                                </h3>
                                <p>{topic.description}</p>
                                {/* Subtle "Created by" text */}
                                <p style={{ fontSize: "0.9rem", color: "#aaa", marginTop: "0.5rem" }}>
                                    Created by: {topic.userName || "Unknown"}
                                </p>
                                    {(topic.userName === currentUserName || currentUserName === adminUsername) && (
                                    <div className="buttons">
                                        <button
                                            className="edit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingTopic({ id: topic.id, description: topic.description });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(topic.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </TopicsContainer>
    );
}