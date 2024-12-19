import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    form {
        background-color: #1f1f1f;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        width: 100%;
        max-width: 400px;

        h2 {
            text-align: center;
            margin-bottom: 1.5rem;
        }

        .form-group {
            margin-bottom: 1rem;

            label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
            }

            input {
                width: 100%;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #333;
                background-color: #2a2a2a;
                color: white;
            }
        }

        .error {
            color: red;
            text-align: center;
            margin-bottom: 1rem;
        }

        button {
            width: 100%;
            margin-top: 1rem;
        }
    }
`;

export default function Register() {
    const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate("/login"); // Redirect to login page on success
        } catch (err) {
            setError("Registration failed. Username may already be taken.");
        }
    };

    return (
        <RegisterContainer>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={formData.userName}
                        onChange={(e) =>
                            setFormData({ ...formData, userName: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </RegisterContainer>
    );
}