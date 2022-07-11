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
      //   const oldTodo = oldTodos[targetIndex];
      // name as any라고 하면 타입스크립트에게 name은 확인하지마 날 믿으라 하는거다
      // 하지만 이런식으로 any라고 하면 굳이 타입스크립트를 사용할 필요가 없기 때문에 이전에 카테고리값을 argument으로 하는것이 더 나을거다
      const newToto = { text, id, category: name as any };
      // 원소의 위치가 바뀌지 않기 위해서 배열의 요소를 교체한다
      //   const foods = ["pizza", "mango", "potato", "kimbab"];
      //   const front = foods.slice(0, 1); // mango의 앞부분 ['pizza']
      //   const back = foods.slice(1 + 1); // mango의 뒷부분 ['potato', 'kimbab']
      //   const finalResult = [...front, "감", ...back];
      //   console.log(finalResult); // ['pizza', '감', 'potato', 'kimbab']

      // 기존의 todos를 업데이트하는것이 아니라 새로운 todos를 반환한다
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
