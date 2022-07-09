import { useForm } from "react-hook-form";
import { Container, Title } from "../components/Common";

interface IForm {
    todo: string;
}

function Todos() {
    const {register, handleSubmit, setValue, formState:{errors}} = useForm<IForm>();

    // 모든 Input들이 validation을 통과할 때
    const onValid = (data:IForm) => {
        console.log('Add Todo', data.todo);
        setValue('todo', ''); // todo의 값을 빈문자열로 변경시킨다
    }

    return (
       <Container>
         <Title>To Do List</Title>
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register('todo', {required: '할일을 적어주세요'})} type='text' placeholder="할일을 적자"/>
            <span>{errors?.todo?.message}</span>
            <button>ADD</button>
        </form>
       </Container>
    );
}

export default Todos;