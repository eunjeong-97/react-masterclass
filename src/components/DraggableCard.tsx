import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCard {
  todo: string;
  index: number;
}

const Card = styled.div`
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

function DraggableCard({ todo, index }: IDraggableCard) {
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
