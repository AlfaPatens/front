import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import styled from "styled-components";
import logo from "../assets/GigaChat1.png";

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1f1f1f;
  color: white;
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;

    img {
      height: 40px;
      margin-right: 0.5rem;
    }
  }
`;

const CenterNav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  .nav-link {
    text-decoration: none;
    color: #00aced;
    font-size: 1.2rem;

    &:hover {
      color: #ffa726;
    }
  }
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .nav-button {
    background: orange;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: darkorange;
    }
  }
`;

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(""); // State for username
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);

            try {
                const decoded = jwtDecode(token);
                const username =
                    decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User";
                setUsername(username);
            } catch (err) {
                console.error("Failed to decode token:", err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUsername("");
        navigate("/"); // Redirect to home
    };

    return (
        <HeaderContainer>
            {/* Left Navigation */}
            <LeftNav>
                <Link to="/" className="logo">
                    <img src={logo} alt="GigaChat Logo" />
                    GigaChat
                </Link>
            </LeftNav>

            {/* Center Navigation */}
            <CenterNav>
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/topics" className="nav-link">
                    Topics
                </Link>
            </CenterNav>

            {/* Right Navigation */}
            <RightNav>
                {isLoggedIn ? (
                    <>
                        <span>User: {username}</span>
                        <button onClick={handleLogout} className="nav-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="nav-link">
                            Register
                        </Link>
                    </>
                )}
            </RightNav>
        </HeaderContainer>
    );
};

export default Header;
