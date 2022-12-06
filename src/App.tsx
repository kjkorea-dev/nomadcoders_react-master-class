import React from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from "styled-components";
import { theme } from "./theme";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Card from "./components/Card";

const reset = css`
  @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap");
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Source Sans Pro", sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: black;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const GlobalStyle = createGlobalStyle`${reset}`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 20px 30px;
  border-radius: 5px;
  min-height: 200px;
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index
      // console.log("Delete item on", source.index);
      // console.log("list", toDosCopy);
      const [item] = toDosCopy.splice(source.index, 1);
      // console.log("Deleted item", item);
      // console.log("list", toDosCopy);
      // 2) Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0, item);
      // console.log("Put back", item, "on ", destination.index);
      // console.log("list", toDosCopy);
      return toDosCopy;
    });
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              <Droppable droppableId="one">
                {(provided) => (
                  <Board ref={provided.innerRef} {...provided.droppableProps}>
                    {toDos.map((toDo, index) => (
                      <Card key={toDo} index={index} toDo={toDo} />
                    ))}
                    {provided.placeholder}
                  </Board>
                )}
              </Droppable>
            </Boards>
          </Wrapper>
        </DragDropContext>
      </ThemeProvider>
    </>
  );
};

export default App;
