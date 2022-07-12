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

  //  드래그가 완료되고 어떻게 할지 지정을 하지 않았기 때문에 드래그를 해도 원상태로 돌아간다
  const onDragEnd = () => {};
  return (
    <div>
      <input type="number" placeholder="Minutes" value={minutes} onChange={onMinutesChange} />
      <input type="number" placeholder="Hours" value={hours} onChange={onHoursChange} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => (
              <ul ref={magic.innerRef} {...magic.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {/* Draggable컴포넌트가 provided props에서 제공하는
                        draggableProps: 만약 요소가 기본적으로 드래그 되기를 원한다면 draggableProps를 사용하면 된다(요소 전체를 드래그하는것을 의미한다)
                        dragHandleProps: 원하는곳 어디에서든지 카드를 집어서 드래그 할 수 있지만 때때로 코너에만 드래그할 수 있게 하고 싶은경우 Handle을 사용한다
                        만약 유저를 하여금 li를 어떠한 위치에서든지 드래그해서 옮기도록 하고 싶다면 li에 draggableProps와 dragHandleProps를 넣어주면 된다
                    */}
                  {(magic) => (
                    <li ref={magic.innerRef} {...magic.draggableProps}>
                      {/* dragHandleProps를 주면 li가 핸들링하는데에 trigger가 된다는 걸 의미한다 
                            즉 ✅ 버튼만 누를 수 있음
                        */}
                      <span {...magic.dragHandleProps}>✅</span>
                      First
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(magic) => (
                    // Second 글씨자체를 드래그할 수 있음
                    <li ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                      Second
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Trello;
