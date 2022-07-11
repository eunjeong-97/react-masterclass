import { atom, selector } from "recoil";
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export interface ITodo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE";
}

export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

// selector는 state를 가져다가 원하는대로 모습을 변형시킬 수 잇는 도구이다
// todoState는 하나의 배열이지만 그 todoState들의 아이템들을 각각의 배열로 분류하고 싶기 때문이다
// atom에 데이터를 모아두고 selector로 데이터를 변형할 수 있다
// 하지만 지금처럼 모든 카테고리를 한번에 return하는 대신 하나의 카테고리만 return하도록 새로운 selector state를 만들것이다
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    // if (category == "TODO") return todos.filter((todo) => todo.category === "TODO");
    // if (category === "DOING") return todos.filter((todo) => todo.category === "DOING");
    // return todos.filter((todo) => todo.category === "DONE");
    return todos.filter((todo) => todo.category === category);
  },
});

export const categoryState = atom({
  key: "category",
  default: "TODO",
});
