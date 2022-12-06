import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  // default: ["a", "b", "c", "d", "e", "f", "g"],
  default: {
    "To Do": ["a", "b", "c"],
    Doing: ["d", "e", "f"],
    Done: ["g"],
  },
});
