import React from "react";
import styled from "styled-components";
import logo from "../assets/GigaChat.png"; // Replace with your logo path

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  width: 100vw; /* Ensure it spans the full viewport width */
  height: 100vh; /* Full height */
  margin: 0; /* Remove any margin */
  padding: 0; /* Remove any padding */
  background: linear-gradient(120deg, #e3f2fd, #ffffff);

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white; /* White background */
    padding: 3rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 40%; /* Stretch content */
    max-width: 1400px; /* Limit the width for larger screens */
  }

  .logo {
    width: 150px; /* Adjust logo size */
    margin-bottom: 2rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    font-size: 1.25rem;
    color: #495057;
    text-align: center;
  }
`;

export default function Home() {
    return (
        <HomeContainer>
            <div className="content">
                <img src={logo} alt="GigaChat Logo" className="logo" />
                <h2>Welcome to the GigaChat Forum</h2>
                <p>Here chats only Giga Chads!</p>
            </div>
        </HomeContainer>
    );
}
