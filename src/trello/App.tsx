import React from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from "styled-components";
import { theme } from "./theme";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/Board";

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
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setToDos((oldBoards) => {
        const boardCopy = [...oldBoards[source.droppableId]];
        const [item] = boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index as number, 0, item);
        return {
          ...oldBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDos((oldBoards) => {
        const sourceBoard = [...oldBoards[source.droppableId]];
        const destinationBoard = [...oldBoards[destination.droppableId]];
        const [item] = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, item);
        return {
          ...oldBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(toDos).map((boardId, index) => (
                <Board toDos={toDos[boardId]} boardId={boardId} key={index} />
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </ThemeProvider>
    </>
  );
};

export default App;
