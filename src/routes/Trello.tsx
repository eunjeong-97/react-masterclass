import React from "react";
import { useRecoilState } from "recoil";

import { minuteState, hourSelector } from "../atom/trello";

function Trello() {
  // atom에서 useRecoilState를 하게 되면
  // 첫번째 인자는 atom의 값이고
  // 두번째인자는 atom을 수정하는 함수
  const [minutes, setMinutes] = useRecoilState(minuteState);
  //   selector에서 useRecoilState를 하게 되면
  // 첫번째인자로는 get property로부터 return한 값이고
  // 두번째인자는 set property를 실행하는 함수이다
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input type="number" placeholder="Minutes" value={minutes} onChange={onMinutesChange} />
      <input type="number" placeholder="Hours" value={hours} onChange={onHoursChange} />
    </div>
  );
}

export default Trello;
