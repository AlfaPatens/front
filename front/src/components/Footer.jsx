import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 3rem;
  background-color: #1f1f1f;
  color: white;
  text-align: center;
`;

export default function Footer() {
	return <FooterContainer>© 2024 ChadHub. All rights reserved.</FooterContainer>;
}