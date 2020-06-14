import React from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/use-local-storage";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/grayscale.css";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: grid;
  grid-template-areas: "header" "main";
  grid-template-rows: 1fr 93%;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 200;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
  z-index: 1;
`;

const Main = styled.main`
  grid-area: main;
  display: grid;
  grid-template-areas: "text visual";
  grid-template-columns: 50% 50%;
`;

const TextArea = styled.textarea`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 2rem;
  resize: none;
  border: none;
  &:focus {
    outline: 1px solid black;
    outline-offset: -1em;
  }
`;

const Content = styled.div`
  padding: 2rem;
  code {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.2rem;
  }
  pre {
    overflow-x: auto;
    code {
      font-family: "Inconsolata", "Menlo", "Consolas", monospace;
      background: initial;
    }
  }
`;

function App() {
  const [note, setNote] = useLocalStorage("simple-notes");
  const md = new MarkdownIt("commonmark", {
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });

  const handleOnChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>Simple notes</Title>
      </Header>
      <Main>
        <TextArea
          placeholder="Your notes"
          onChange={handleOnChange}
          value={note}
        ></TextArea>
        <Content dangerouslySetInnerHTML={{ __html: md.render(note) }} />
      </Main>
    </Container>
  );
}

export default App;
