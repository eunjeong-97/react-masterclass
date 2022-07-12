import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { minuteState, hourSelector } from "../atom/trello";
import { Title } from "../components/Common";
import { newTodoState } from "../atom/todo";

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

  const onDragEnd = ({ destination, source }: DropResult) => {
    // 어떤일이 일어났는지에 대한 정보로 많은 argument를 준다
    // Draggable의 draggableId이며
    // Draggable컴포넌트가 어디로 드래그 되었는지 index나 Droppable의 draggableId를 알려준다
    // source는 시작점 destination 도착지
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
                    // draggableId: 현재 내가 드래그한 요소를 찾을때 활용
                    // 따라서 값을 넣어주는것이 좋다
                    <Draggable draggableId={todo} index={index} key={index}>
                      {(magic) => (
                        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                          {todo}
                        </Card>
                      )}
                    </Draggable>
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
