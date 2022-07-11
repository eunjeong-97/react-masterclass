import { useRecoilValue } from "recoil";

import { Container, Title } from "../components/Common";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";

import { todoState } from "../atom";

function Todos() {
  const todos = useRecoilValue(todoState);
  return (
    <Container>
      <Title>To Do List</Title>
      <CreateTodo />
      <ul>
        {todos.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
    </Container>
  );
}

export default Todos;
