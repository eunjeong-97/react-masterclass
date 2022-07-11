import { useSetRecoilState } from "recoil";
import { ITodo, todoState } from "../atom";

function Todo({ text, category, id }: ITodo) {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const setTodos = useSetRecoilState(todoState);
  // 만약 사용자가 Doing버튼을 클릭하면 인자를 통해서 Doing 버튼이 클릭된 것을 알고 싶다

  // 선택한 카테고리로 상태변경하기위해
  // newCategory의 타입은 "TODO" | "DOING" | "DONE" 이라고 지정
  //   const onClick = (newCategory: ITodo["category"]) => {
  //     console.log(newCategory);
  //    };
  //   return (
  //     <li>
  //       <span>{text}</span>
  //       {/* onClick함수에 카테고리 인자 전달 */}
  //       {category !== "TODO" && <button onClick={() => onClick("TODO")}>TO DO</button>}
  //       {category !== "DOING" && <button onClick={() => onClick("DOING")}>DOING</button>}
  //       {category !== "DONE" && <button onClick={() => onClick("DONE")}>DONE</button>}
  //     </li>
  //   );

  // onClick함수에 인자를 전달하지 않고 구현
  // button에 이름을 붙여주고, 버튼에 onClick이벤트가 발생하면 이벤트를 잡아서
  // 선택한 카테고리로 상태를 변경하기 위한 함수
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(name);
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
