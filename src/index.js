import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  body {
    margin: 0;
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
