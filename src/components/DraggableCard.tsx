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

// ReactJS에게 prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 말라고 설정
export default React.memo(DraggableCard);

// react.js에서 component의 state가 변하면 해당 component의 모든 children은 모두 리렌더링된다
// 그래서 드래그하는순간 엄청많은 리렌더링이 된다: 드래그하지 않은 컴포넌트도 리렌더링됨
// 부모 state가 변경되도 자식컴포넌트도 리렌더링되기 때문이다
// 원래 reactJS가 이렇긴 하지만 이러한 불필요한 리렌더링을 막아주기 위해 React.memo를 사용한다
// react memo는 reactJS에게 제발 이 컴포넌트는 리렌더링하지 말라고 말하는 역할을 한다
// 즉 react memo는 reactJS에게 props가 바뀌지 않는다면 해당 컴포넌트를 리렌더링하지 말라고 한다
// prop가 동일할땐 리렌더링안함
