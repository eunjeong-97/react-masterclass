import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { minuteState, hourSelector } from "../atom/trello";
import { Title } from "../components/Common";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.textColor};
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  padding: 30px 10px 10px 10px;
  gap: 10px;
`;

const Board = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  padding: 10px;
`;

const Card = styled.div`
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const BoardTitle = styled(Title)`
  width: 80%;
  margin: 0 auto 5px auto;
`;

const todos = ["a", "b", "c", "d", "e"];

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
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  <BoardTitle size={15}>Board</BoardTitle>
                  {todos.map((todo, index) => (
                    <Draggable draggableId={todo} index={index}>
                      {(magic) => (
                        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                          {todo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {/* placeholder는 droppable이 끝날때 두는 무언가라서 사이즈가 이상하게 변하지 않을거라사이즈가 변하는 board의 끝에서 magic.placeholder을 두면 된다
                  기존의 board사이즈를 유지시킴: 없으면 board사이즈 줄어듬 */}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </div>
  );
}

export default Trello;
