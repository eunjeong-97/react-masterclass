import { atom, selector } from "recoil";
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

// 계속해서 사용해야 할 값을 저장할 수 있는 도구이다
export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

// 특정 카테고리에 해당하는 todo만 보기 위해 만듬
// categoryState가 변할때마다 selector도 실행된다
// select태그에서 값이 변경되면 categoryState변경되도록 구현
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

// 새로 추가하는 todo들은 모두 todoState에 들어간다
export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

// 실제로는 get function에 의해 설정된 옵션에 따라 변환된 todoState를 사용한다
// 즉 todoState를 가져다가 categoryState에 맞는 todoState만을 걸러서 반환한다
// 컴포넌트에서 조건부렌더링을 하지 않아도 된다
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
