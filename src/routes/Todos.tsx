import { useRecoilState, useRecoilValue } from "recoil";

import { Container, Title } from "../components/Common";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";

import { categoryState, todoSelector, Categories } from "../atom";
import React from "react";

function Todos() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    // 타입스크립트는 option의 value가 categoties 타입과 같다는걸 알 수 없다
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
