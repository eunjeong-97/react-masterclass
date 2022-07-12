import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { minuteState, hourSelector } from "../atom/trello";
import { Title } from "../components/Common";
import { newTodoState } from "../atom/todo";
import DraggableCard from "../components/DraggableCard";

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

const BoardTitle = styled(Title)`
  width: 80%;
  margin: 0 auto 5px auto;
`;

function Trello() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const [todos, setTodos] = useRecoilState(newTodoState);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTodos((currentTodos) => {
      const copyTodos = [...currentTodos];
      copyTodos.splice(source.index, 1);
      copyTodos.splice(destination.index, 0, draggableId);
      // state가 변경되면서 글씨가 좀 흔들리는 이슈가 생긴다
      // state의 순서를 변경하는데 React는 모든 card를 리렌더링하기 때문에 약간의 간극이 발생한다
      return copyTodos;
    });
  };
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
                    <DraggableCard key={todo} index={index} todo={todo} />
                  ))}
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
