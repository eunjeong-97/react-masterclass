import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { minuteState, hourSelector } from "../atom/trello";

function Trello() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    // event.currentTarget.value의 타입은 string이지만 앞에 +를추가하면 number로 바꿔준다
    // "1" → 1
    setMinutes(+event.currentTarget.value);
  };
  return (
    <div>
      <input type="number" placeholder="Minutes" value={minutes} onChange={onMinutesChange} />
      <input type="number" placeholder="Hours" value={hours} />
    </div>
  );
}

export default Trello;
// minuteState를 가져와서 Hours에 보여지는 값이 바뀌도록 하고 싶은데
// state를 가져와서 그 state를 수정하고 output을 내보낼때 selectors를 사용하면 된다
