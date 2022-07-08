import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  // react-hook-form이 모든 validation을 다 마쳤을때만 호출된다
  const onValid = (data: any) => console.log(data); // {Email: "", FirstName: "",  LastName: "",  Password1: "",  Password2: "",  Username: ""}

  const onNotValid = () => {
    alert("유효하지 않은 데이터입니다");
    console.log(formState.errors);
    // 콘솔에서 아래와 같이 어느부분에서 어느타입의 에러가 발생했는지 확인이 가능하다
    /*{
        Email: {message: "Your Email is too short", ref:inpuut~~, type: "minLength"}
        Username: {message:"UserName is Required", ref:input~~, type:"required"},
        Password1: {message:"", ref:input~~, type: "minLength"}, 
        Password2:{message:"", ref:input~~, type: "minLength"}
    } */
  };
  return (
    <div>
      {/* 보통은 onSubmit={()=>change()} 이런식으로 바로 함수를호출하지 않는데 여기서는 바로 함수를 호출해야 한다
        그리고 나서 유저가 실제로 submit을 하면 handleSubmit은 해야하는 모든 validation이나 다른 일을 전부 끝마친뒤에 우리의 데이터가 유효할때만 첫번째인자로 받은 함수를 호출할 것이다
        */}
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid, onNotValid)}>
        {/* HTML속성으로 required를 보호받아도 좋긴하지만 개발자도구에서 코드를 수정하거나 이런 속성을 제공하지 않는 브라우저에서 실행할수도 있기 때문에 자바스립트에서도 유효성검사를 해주는것이 좋다 */}
        <input {...register("Email", { required: true, minLength: { value: 5, message: "Your Email is too short" } })} placeholder="Email" />
        <input {...register("FirstName", { required: true })} placeholder="First Name" />
        <input {...register("LastName", { required: true })} placeholder="Last Name" />
        <input {...register("Username", { required: "UserName is required", maxLength: 10 })} placeholder="Username" />
        <input {...register("Password1", { required: true, minLength: 5 })} placeholder="Password1" />
        <input {...register("Password2", { required: true, minLength: 5 })} placeholder="Password2" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;

/*
이전에는 onSubmit햇을때 우리가 직접 form의 submit 이벤트를 가져다가
직접 preventDefault를 해주고 직접 데이터를 받아왔다
이제 useForm으로 작업할때는 handleSubmit이라는 함수를 받아오기만 하면 된다

handleSubmit은 preventDefault를 해주고, 우리가 작성한 코드가 진행되게 해준다
그리고 유효하지 않은 데이터일때는 해당 input으로 커서를 이동시켜준다
*/
