import React from "react";
import styled from "styled-components";

const PageLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export default function PageLayout({ children }) {
    return <PageLayoutContainer>{children}</PageLayoutContainer>;
}