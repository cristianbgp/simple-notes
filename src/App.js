import React from "react";
import styled from "styled-components";
import useLocalStorage from "./hooks/use-local-storage";

const Container = styled.div`
  height: 100%;
`;
const Title = styled.h1`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
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
      <Title>Simple notes</Title>
      <TextArea
        placeholder="Your notes"
        onChange={handleOnChange}
        value={note}
      ></TextArea>
    </Container>
  );
}

export default App;
