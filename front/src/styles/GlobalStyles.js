import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100vw; /* Full width */
    height: 100vh; /* Full height */
    overflow: hidden; /* Prevent scrolling */
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(120deg, #1a73e8, #4285f4, #66a0f8);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #ff9800;
    transition: color 0.3s ease;

    &:hover {
      color: #ffa726;
    }
  }

  button {
    cursor: pointer;
    border: none;
    padding: 12px 20px;
    border-radius: 50px;
    background: linear-gradient(135deg, #ff6f00, #ffa000);
    color: white;
    font-size: 1rem;
    transition: transform 0.3s ease, background-color 0.4s ease;

    &:hover {
      background: linear-gradient(135deg, #e65100, #ff9800);
      transform: translateY(-3px);
    }
  }

  header {
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

    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      max-width: 100%;
      font-size: 1.5rem;
      font-weight: bold;

      img {
        height: 40px;
        margin-right: 0.5rem;
      }
    }

    .nav-center {
      flex: 1; /* Allows the center navigation to take up remaining space */
      display: flex;
      justify-content: center;
      gap: 1.5rem; /* Spacing between links */

      .nav-link {
        text-decoration: none;
        color: #00aced;
        font-size: 1.2rem;

        &:hover {
          color: #ffa726;
        }
      }
    }

    .nav-right {
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
    }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
    box-sizing: border-box;
  }

  .user-info {
    font-size: 0.9rem;
    color: #ffc107;
  }
`;

export default GlobalStyles;
