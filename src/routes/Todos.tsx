import { useRecoilValue } from "recoil";

import { Container, Title } from "../components/Common";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";

import { todoSelector } from "../atom";

function Todos() {
  //   const todos = useRecoilValue(todoState);
  const [todos, doings, dones] = useRecoilValue(todoSelector);
  //   const selectorOutput = useRecoilValue(todoSelector);
  //   console.log(selectorOutput); // atom.ts에서 get함수에서 return된값을 확인할 수 잇다
  // todo가 추가되거나 카테고리가 변경되었을때 selector가 작동함에 따라 실행된다
  // 주의해야할 점은 state 자체가 바뀌는게 아니라 그 return값을 바뀌는 것이다
  // todoState는 변경되지않는다
  return (
    <Container>
      <Title>To Do List</Title>
      <CreateTodo />
      <h2>TO DO</h2>
      <ul>
        {todos.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
      <h2>DOING</h2>
      <ul>
        {doings.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
      <h2>DONE</h2>
      <ul>
        {dones.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
    </Container>
  );
}

export default Todos;
