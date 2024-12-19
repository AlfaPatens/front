import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #121212;
    color: #f4f4f4;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  button {
        cursor: pointer;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        background-color: #00aced;
        color: white;
        font-size: 1rem;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #007bb5;
        }
    }

  main {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Arial', sans-serif;
        background-color: #000;
        color: white;
        line-height: 1.6;
        min-height: 100vh;
    }
    main {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
`;