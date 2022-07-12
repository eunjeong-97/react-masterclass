import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

interface ITodostate {
  // string으로서 property와 string[] 타입의 array로 이루어져있다
  [key: string]: string[];
}

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});

export const todoState = atom<ITodostate>({
  key: "todo",
  default: {
    todo: ["a", "b", "c", "d", "e"],
    doing: [],
    done: [],
  },
});
