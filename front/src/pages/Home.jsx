import React from "react";
import styled from "styled-components";
import logo from "../assets/ChadHub.png"; // Replace with your logo path

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh; /* Fullscreen height */
  width: 100%; /* Fullscreen width */
  background-color: #121212; /* Match dark theme */
  color: white;

  img {
    width: 150px; /* Adjust size of the logo */
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 4rem; /* Larger heading */
    margin-bottom: 1rem;
    font-weight: bold;
  }

  p {
    font-size: 1.5rem; /* Larger text */
    color: #ccc;
    margin-bottom: 3rem;
  }
`;

export default function Home() {
    return (
        <HomeContainer>
            <img src={logo} alt="ChadHub Logo" />
            <h2>Welcome to the ChadHub Forum</h2>
            <p>Here we share secrets with Chad community</p>
        </HomeContainer>
    );
}