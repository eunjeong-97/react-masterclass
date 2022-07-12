import React from "react";
import { useRecoilState } from "recoil";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { minuteState, hourSelector } from "../atom/trello";

function Trello() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  // 유저가 드래그가 끝난 시점에서 불려지는 함수
  const onDragEnd = () => {};
  return (
    <div>
      <input type="number" placeholder="Minutes" value={minutes} onChange={onMinutesChange} />
      <input type="number" placeholder="Hours" value={hours} onChange={onHoursChange} />
      {/* 드래그 & 드롭이 가능한 영역 설정 */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Drappable 안에 component를 넣으면 바로 사용할 수 있는 무언가를 얻는다
        지금 당장은 보이지 않지만 일단 Draggable을 만든다
        드롭할 수 잇는 영역 설정
        */}
        <Droppable droppableId="one">
          {() => (
            <ul>
              {/* 드래그 가능한 요소 */}
              <Draggable draggableId="first" index={0}>
                {() => <li>Hello</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {() => <li>Hello</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Trello;

// DragDropContext, Droppable, Draggable
// <DragDropContext/>: 기본적으로 드래그 앤 드롭을 가능하게 하는 앱의 한 부분지정한다
// 우리 앱의 전체에 적용되는게 아니라 특정지점에만 지정
// <Droppable/>: 우리가 어떤걸 드롭할 수 있는 영역
