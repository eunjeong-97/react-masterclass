import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { minuteState, hourSelector } from "../atom/trello";

import { todoState } from "../atom/trello";
import BoardWrap from "../components/BoardWrap";

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

function Trello() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const [todos, setTodos] = useRecoilState(todoState);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setTodos((currentTodos) => {
    //   const copyTodos = [...currentTodos];
    //   copyTodos.splice(source.index, 1);
    //   copyTodos.splice(destination.index, 0, draggableId);
    //   return copyTodos;
    // });
  };
  return (
    <div>
      <input type="number" placeholder="Minutes" value={minutes} onChange={onMinutesChange} />
      <input type="number" placeholder="Hours" value={hours} onChange={onHoursChange} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <BoardWrap todos={todos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </div>
  );
}

export default Trello;
