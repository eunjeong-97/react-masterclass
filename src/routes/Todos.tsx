import { useRecoilState, useRecoilValue } from "recoil";

import { Container, Title } from "../components/Common";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";

import { categoryState, todoSelector } from "../atom";
import React from "react";

function Todos() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };
  return (
    <Container>
      <Title>To Do List</Title>
      <hr />
      <select onInput={onInput}>
        {/* 여기서 value는 카테고리값을 넣어주면된다 */}
        <option value="TODO">TO DO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
      </select>
      <CreateTodo />
      {/* <h2>TO DO</h2>
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
      </ul> */}
      {todos?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Container>
  );
}

export default Todos;
