import {  useRecoilValue } from "recoil";

import { Container, Title } from "../components/Common";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";

import {todoState } from '../atom';

function Todos() {
    const todos = useRecoilValue(todoState);

    return (
       <Container>
         <Title>To Do List</Title>
        <CreateTodo />
        <ul>
            {/* {todos.map(todo=><Todo key={todo.id} text={todo.text} id={todo.id} category={todo.category} />)} */}
            {todos.map(todo=><Todo {...todo} key={todo.id} />)}
        </ul>
       </Container>
    );
}

export default Todos;

/*
todos의 category를 변경하는 기능을 추가하는데 selector를 활용하면 된다
selector를 이용하면 state로부터 데이터를 만들 수 잇다
 */