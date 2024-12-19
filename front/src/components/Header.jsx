import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/ChadHub.png";

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
                // Extract the username using the claim key
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

    const styles = {
        header: {
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            backgroundColor: "#1f1f1f",
            color: "white",
        },
        logo: {
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
        },
        logoImage: {
            height: "40px",
            marginRight: "0.5rem",
        },
        nav: {
            display: "flex",
            gap: "1rem",
        },
        navLink: {
            textDecoration: "none",
            color: "#00aced",
            fontSize: "1.2rem",
        },
        navButton: {
            background: "none",
            border: "none",
            color: "#00aced",
            fontSize: "1.2rem",
            cursor: "pointer",
            padding: 0,
        },
    };

    return (
        <>
            <div style={{ height: "70px" }}></div>
            <header style={styles.header}>
                <Link to="/" style={styles.logo}>
                    <img src={logo} alt="ChadHub Logo" style={styles.logoImage} />
                    ChadHub
                </Link>
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>
                        Home
                    </Link>
                    <Link to="/topics" style={styles.navLink}>
                        Topics
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <span style={{ color: "#ccc", fontSize: "1.2rem" }}>
                                User: {username}
                            </span>
                            <button onClick={handleLogout} style={styles.navButton}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.navLink}>
                                Login
                            </Link>
                            <Link to="/register" style={styles.navLink}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
        </>
    );
};

export default Header;