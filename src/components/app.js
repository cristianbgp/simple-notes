import React from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/use-local-storage";

const Container = styled.div`
  display: grid;
  grid-template-areas: "header" "text";
  grid-template-rows: 1fr 93%;
  height: 100%;
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

const TextArea = styled.textarea`
  grid-area: text;
  padding: 3em;
  resize: none;
  border: none;
  &:focus {
    outline: 1px solid black;
    outline-offset: -1em;
  }
`;

function App() {
  const [note, setNote] = useLocalStorage("simple-notes");

  const handleOnChange = event => {
    setNote(event.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>Simple notes</Title>
      </Header>
      <TextArea
        placeholder="Your notes"
        onChange={handleOnChange}
        value={note}
      ></TextArea>
    </Container>
  );
}

export default App;
