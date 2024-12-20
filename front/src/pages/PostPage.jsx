import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCommentsByPost, createComment, updateComment, deleteComment } from "../services/commentsService";
import { getPostsByTopic } from "../services/postsService";
import { getUserNameById } from "../services/authService"; // Import function to fetch usernames
import { getLoggedInUsername } from "../services/authUtils"; // Import utility function

const PostContainer = styled.main`
  margin-top: 3rem;
  text-align: center;

  h2 {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    color: #f8f9fa;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  }

  p {
    color: #dee2e6;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    background: #212529;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    textarea {
      width: 100%;
      height: 100px;
      padding: 1rem;
      background-color: #343a40;
      border: 1px solid #495057;
      color: #f8f9fa;
      border-radius: 8px;
      resize: none;
      font-size: 1rem;
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

  .comments-list {
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
        gap: 0.8rem;
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


export default function PostPage() {
    const { topicId, postId } = useParams();
    const [post, setPost] = useState({ title: "", body: "" });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [error, setError] = useState(null);
    const currentUserName = getLoggedInUsername(); // Get the logged-in username
    const adminUsername = "admin";

    // Fetch post and comments
    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await getPostsByTopic(topicId);
                const currentPost = posts.$values.find((p) => p.id === parseInt(postId));
                setPost(currentPost || {});

                const commentData = await getCommentsByPost(topicId, postId);
                const commentsWithUsernames = await Promise.all(
                    commentData.$values.map(async (comment) => {
                        const userName = await getUserNameById(comment.userId);
                        return { ...comment, userName };
                    })
                );
                setComments(commentsWithUsernames);
                setError(null); // Clear error on success
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch post or comments.");
            }
        };
        fetchData();
    }, [topicId, postId]);

    const handleCreateComment = async () => {
        if (!newComment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        try {
            const created = await createComment(topicId, postId, { content: newComment });
            const userName = await getUserNameById(created.userId);
            setComments([...comments, { ...created, userName }]);
            setNewComment("");
            setError(null); // Clear error on success
        } catch (err) {
            console.error("Error creating comment:", err);
            setError("Failed to create comment.");
        }
    };

    const handleUpdateComment = async (commentId) => {
        try {
            const updated = await updateComment(topicId, postId, commentId, { content: editingComment.content });
            const userName = await getUserNameById(updated.userId);
            setComments(comments.map((c) => (c.id === commentId ? { ...updated, userName } : c)));
            setEditingComment(null);
            setError(null); // Clear error on success
        } catch (err) {
            console.error("Error updating comment:", err);
            setError("Failed to update comment.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(topicId, postId, commentId);
            setComments(comments.filter((c) => c.id !== commentId));
            setError(null); // Clear error on success
        } catch (err) {
            console.error("Error deleting comment:", err);
            setError("Failed to delete comment.");
        }
    };

    return (
        <PostContainer>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            {/* Add Comment */}
            <div className="comment-form">
                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button onClick={handleCreateComment}>Add Comment</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Comments List */}
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {editingComment?.id === comment.id ? (
                            <>
                                <textarea
                                    value={editingComment.content}
                                    onChange={(e) =>
                                        setEditingComment({ ...editingComment, content: e.target.value })
                                    }
                                ></textarea>
                                <div className="buttons">
                                    <button className="edit" onClick={() => handleUpdateComment(comment.id)}>
                                        Save
                                    </button>
                                    <button className="delete" onClick={() => setEditingComment(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{comment.content}</p>
                                <p>Created by: {comment.userName || "Unknown"}</p> {/* Username display */}
                                    {(comment.userName === currentUserName || currentUserName === adminUsername) && (
                                    <div className="buttons">
                                        <button
                                            className="edit"
                                            onClick={() => setEditingComment({ id: comment.id, content: comment.content })}
                                        >
                                            Edit
                                        </button>
                                        <button className="delete" onClick={() => handleDeleteComment(comment.id)}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </PostContainer>
    );
}
