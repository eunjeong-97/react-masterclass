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

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // 도착지가 없으면 아무런 변화주지 않는다
    if (!destination) return;
    // splice()는 우리의 array를 재정렬하도록 도와준다
    // 한 자리에서 array를 수정하고 변형시킬 수 있다

    // 새로운 state을 전달해서 교체를 해주거나
    // 현재의 값을 argument로 주고 새로운 state를 return함수를 전달하거나
    setTodos((currentTodos) => {
      // 현재todos의 복사본을 만들어서 복사본을 변형하고 그 후 그 복사본을 return한다
      const copyTodos = [...currentTodos];
      // 1. source.index item삭제: 움직이는 item삭제
      // source는 그 움직임의 source를 가지고 있는 object이다
      copyTodos.splice(source.index, 1);
      // 2. 움직이는 item을 도착한지점에 넣어줌
      copyTodos.splice(destination.index, 0, draggableId);
      // state가 변경되면서 글씨가 좀 흔들리는 이슈가 생긴다
      // 최적화와 관련된문제
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
                    // Draggable의 key와 draggalbeId와 같아야한다
                    // ReactJS에서 key는 index로 줬지만 여기서는 draggableId와 동일한 todo를 줘야 한다
                    <Draggable draggableId={todo} index={index} key={todo}>
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
