import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { categoryState, todoState } from "../atom/todo";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);

  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, category, id: Date.now() }, ...oldTodos]);
    setValue("todo", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("todo", { required: "할일을 적어주세요" })} type="text" placeholder="할일을 적자" />
      <span>{errors?.todo?.message}</span>
      <button>ADD</button>
    </form>
  );
}

export default CreateTodo;
