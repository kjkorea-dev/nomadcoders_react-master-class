import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0 0;
`;

interface DraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const Card = ({ toDoId, toDoText, index }: DraggableCardProps) => {
  console.log(toDoId, "has been rendered");
  return (
    <Draggable index={index} draggableId={toDoId + ""}>
      {(provided, snapshot) => (
        <Wrapper
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
