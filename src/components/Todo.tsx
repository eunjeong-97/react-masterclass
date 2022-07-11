import { useSetRecoilState } from "recoil";
import { ITodo, todoState } from "../atom";

function Todo({ text, category, id }: ITodo) {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const setTodos = useSetRecoilState(todoState);
  // todos를 콘솔로 확인해보면 객체타입의 item들이 묶인 array타입인데
  // 여기서 todos라는 state를 업데이트 하려고 기존의 todos array를 mutate(변경)하면 안되고 새로운 state를 만들어야 한다
  // id로 수정해야할 todo를 찾아서 todos array 안에 잇는 object의 index를 찾는다

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // setTodos함수를 사용하면 todos의 값을 즉시 변경할 수 있거나
    // 아니면 현재값(oldTodos)을 argument로 주는 function을 만들 수 있다
    setTodos((oldTodos) => {
      // 변경하려는 todo의 index찾기
      // findIndex의 안에서는 (함수형태의)조건을 만족시키는 todo의 index를 찾아준다
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      // 기본적으로 새로운 todo를 만들어서 원래의 todo를 update해야한다
      // 즉, 새로운 카테고리로 새로운 todo를 만들어야 한다
      const oldTodo = oldTodos[targetIndex];
      const newToto = { text, id, category: name };
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
