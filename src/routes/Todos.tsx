import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

import { Container, Title } from "../components/Common";
interface IForm {
    todo: string;
}

interface ITodo {
    text:string;
    id: number;
    category:'TODO' | 'DOING' | 'DONE';
}

const todoState =atom<ITodo[]>({
    key:'todos',
    default:[],
});


function Todos() {
    // useRecoilValue, useSetRecoilState를 한번에 작성가능
    // react의 useState hook을 쓰는것처럼 쓰면 된다
    const [todos, setTodos] = useRecoilState(todoState);
    // const value = useRecoilValue(todoState);
    // const setValue = useSetRecoilState(todoState); // 배열수정
    const {register, handleSubmit, setValue, formState:{errors}} = useForm<IForm>();

    // 모든 Input들이 validation을 통과할 때
    // 여기서 data argument의 타입은 IForm이다
    const onValid = ({todo}:IForm) => {
        console.log('Add Todo', todo);
        // new State로 교체를 해야지 기존의 state를 수정하면 안된다
        // state를 직접 설정해주거나
        // 새로운 state를 return하는 함수를 쓰거나
        setTodos(oldTodos => [{text:todo, category:"TODO", id:Date.now()}, ...oldTodos])
        setValue('todo', ''); // todo의 input값 초기화
    }

    return (
       <Container>
         <Title>To Do List</Title>
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register('todo', {required: '할일을 적어주세요'})} type='text' placeholder="할일을 적자"/>
            <span>{errors?.todo?.message}</span>
            <button>ADD</button>
        </form>
        <ul>
            {todos.map(todo=><li key={todo.id}>{todo.text}</li>)}
        </ul>
       </Container>
    );
}

export default Todos;