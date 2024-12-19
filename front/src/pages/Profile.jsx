import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  color: white;

  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.5rem;
    color: #ccc;
  }
`;

export default function Profile() {
    return (
        <ProfileContainer>
            <h2>Profile Page</h2>
            <p>Profile information goes here.</p>
        </ProfileContainer>
    );
}