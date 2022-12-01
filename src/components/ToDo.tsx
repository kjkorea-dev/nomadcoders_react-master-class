import React from "react";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = ({
    currentTarget: { name },
  }: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const index = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, index),
        {
          id,
          text,
          // to avoid type error
          category: name as any,
        },
        ...oldToDos.slice(index + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
