import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  body {
    height: 100vh;
  }
  #root {
    height: 100%;
  }
`;

const theme = {};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
