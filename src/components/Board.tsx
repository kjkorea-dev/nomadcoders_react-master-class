import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 10px 20px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

interface AreaProps {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}

const Area = styled.div<AreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.draggingFromThis ? "red" : "blue"};
  flex-grow: 1;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface BoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: BoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <Card key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
