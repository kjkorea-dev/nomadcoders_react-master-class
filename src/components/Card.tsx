import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0 0;
`;

interface DraggableCardProps {
  toDo: string;
  index: number;
}

const Card = ({ toDo, index }: DraggableCardProps) => {
  console.log(toDo, "has been rendered");
  return (
    <Draggable index={index} draggableId={toDo} key={toDo}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
