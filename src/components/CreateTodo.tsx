import {useForm } from 'react-hook-form';
import { useSetRecoilState } from "recoil";

import {todoState} from '../atom';

interface IForm {
    todo: string;
}

function CreateTodo() {
    const {handleSubmit, register, formState:{errors}, setValue} = useForm<IForm>();
    const setTodos = useSetRecoilState(todoState);

    const onValid = ({todo}:IForm) => {
        setTodos(oldTodos => [{text:todo, category:"TODO", id:Date.now()}, ...oldTodos])
        setValue('todo', '');
    }
    

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register('todo', {required: '할일을 적어주세요'})} type='text' placeholder="할일을 적자"/>
            <span>{errors?.todo?.message}</span>
            <button>ADD</button>
        </form>
    );

}

export default CreateTodo;