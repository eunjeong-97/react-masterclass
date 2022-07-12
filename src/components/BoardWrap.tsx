import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import DraggableCard from "../components/DraggableCard";
import { Title } from "../components/Common";

interface IBoardWrap {
  todos: string[];
  boardId: string;
}

// 어떤 board의 todo를 움직엿는지 알기 위해 droppalbeId가 필요하다
function BoardWrap({ todos, boardId }: IBoardWrap) {
  return (
    <Droppable droppableId={boardId}>
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
  );
}

export default BoardWrap;

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
