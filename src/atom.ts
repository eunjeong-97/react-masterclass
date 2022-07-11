import { atom, selector } from "recoil";
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

// "TODO" | "DOING" | "DONE" 이 반복되기 때문에 변수선언
// type categories = "TODO" | "DOING" | "DONE";
// enum은 프로그래머를 도와주기 위해 일련의 숫자를 문자로 표시해준다
export enum Categories {
  // "TODO", // Categories.TODO = 0
  // "DOING", // Categories.DOING = 1
  // "DONE", // Categories.DONE = 2
  "TODO" = "TODO", // Categories.TODO = "TODO"
  "DOING" = "DOING", // Categories.DOING = "DOING"
  "DONE" = "DONE", // Categories.DONE = "DONE"
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});
