import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  // set은 수정하고 싶은 recoil atom을 set하는것을 도와준다
  // 두번째로 들어올 값인 newValue는 atom의 변경된값을 나타낸다
  set: ({ set }, newValue) => {
    console.log(newValue); // 변경된 hoursSelector
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes); // minuteState값을 minutes로 변경시킨다
  },
});
