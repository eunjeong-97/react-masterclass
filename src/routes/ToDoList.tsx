import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (todo.length > 10) {
//       return setTodoError("너무길어!");
//     }
//     alert(todo);
//     setTodoError("");
//     setTodo("");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input placeholder="write" onChange={onChange} />
//         {todoError !== "" && <span>{todoError}</span>}
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  // register함수가 있으면 input에서 onChange이벤트핸들러,state, setState모두 필요없어짐
  // watch: form의 입력값들의 변화를 관찰할 수있게 해주는 함수이다
  const { register, watch } = useForm();
  console.log(register("ToTo")); // {name: 'ToTo', onChange: ƒ, onBlur: ƒ, ref: ƒ}
  //input에 필요한 값들을 받을 수 있다
  console.log(watch()); // {toDo: afasdfafasfdasfaf} toDo값 추적가능
  return (
    <div>
      <form>
        {/* input에 값을 입력해서 변경하면 우리의 formData도 잘 바뀐다(반영된다) */}
        <input {...register("Email")} placeholder="Email" />
        <input {...register("FirstName")} placeholder="First Name" />
        <input {...register("LastName")} placeholder="Last Name" />
        <input {...register("Username")} placeholder="Username" />
        <input {...register("Password1")} placeholder="Password1" />
        <input {...register("Password2")} placeholder="Password2" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;

/*
react hook form: 리액트에서 form으로 작업하기에 가장 좋은 방법이다
많은 form을 가지고 있을때 각각의 formData를 직접 validation을 해줘야 한다
*/
