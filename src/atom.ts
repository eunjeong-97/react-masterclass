import { atom } from "recoil";
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

// todoState는 ITodo 타입이고 Todo컴포넌트의 props도 ITodo의 타입을 받기 때문에 export해서 여러 파일에서 사용
export interface ITodo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});
