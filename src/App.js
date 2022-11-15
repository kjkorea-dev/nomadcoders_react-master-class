import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;
const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
  padding: 5px;
`;

function App() {
  return (
    <Father>
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
