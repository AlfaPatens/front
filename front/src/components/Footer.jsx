import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1a1a1a, #333);
  color: #fdd835;
  text-align: center;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  font-size: 1rem;

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-weight: 600;
    }

    a {
      margin-top: 0.5rem;
      color: #ffc107;
      text-decoration: underline;
      transition: color 0.3s ease;

      &:hover {
        color: #ff9800;
      }
    }
  }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <div className="footer-content">
                <span>© 2024 GigaChat. All rights reserved.</span>
            </div>
        </FooterContainer>
    );
}