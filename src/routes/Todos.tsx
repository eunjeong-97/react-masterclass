import { useRecoilState, useRecoilValue } from "recoil";

import { Container, Title } from "../components/Common";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";

import { categoryState, todoSelector, Categories } from "../atom/todo";
import React from "react";

function Todos() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  return (
    <Container>
      <Title>To Do List</Title>
      <hr />
      <select onInput={onInput}>
        <option value={Categories.TODO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateTodo />
      <h2>{category}</h2>
      {todos?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Container>
  );
}

export default Todos;
