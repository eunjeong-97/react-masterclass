import { atom, selector } from "recoil";
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

// recoil의 selectors: state를 입력바당서 그걸 변형해 반환하는 순수함수를 거쳐 반환된 값인 derived state
// default value가 []인 todoState는 카테고리와 상관없이 모든 todo들을 담고 있다
// 이렇게 여러 카테고리를 하나의 state에 저장된 todoState에서 selector를 이용해서 각각의 카테고리의 todos를 분류한다
// 즉, selector를 활용해서 기존의 todoState를 내가 원하는대로 변형해서 다른 state를 만들 수 있다
// 여러개의 atom()을 만들기는 싫고 카테고리에 따라 따로 관리하고 싶을때 selector를 활용하면 좋다

// selector는 atom의 output을 변형시키는 도구이다
// atom은 단순히 배열을 줄 뿐이고 이러한 atom의 return값을 변형시키는건 selector이다
// selector는 state를 가져다가 뭔가를 return할 것이다

export const todoSelector = selector({
  key: "todoSelector",
  // get function은 객체타입의 인자를 받는데 그 객체에는 get function이 있다
  get: ({ get }) => {
    // 여기서 return하는 값이 todoSelector의 value가 된다
    // 인자로 get함수를 받아야 atom을 받을 수 있다
    // 그래서 todoState atom이 변경되면 todos의 값도 변경된다
    const todos = get(todoState);
    return [todos.filter((todo) => todo.category === "TODO"), todos.filter((todo) => todo.category === "DOING"), todos.filter((todo) => todo.category === "DONE")];
  },
});
