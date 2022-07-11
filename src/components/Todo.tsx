import { useSetRecoilState } from "recoil";
import { ITodo, todoState } from "../atom";

function Todo({ text, category, id }: ITodo) {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const setTodos = useSetRecoilState(todoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newToto = { text, id, category: name as any };
      return [...oldTodos.slice(0, targetIndex), newToto, ...oldTodos.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== TODO && (
        <button name={TODO} onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== DOING && (
        <button name={DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== DONE && (
        <button name={DONE} onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
}

export default Todo;
