import { useForm } from "react-hook-form";

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => console.log(data);
  const onNotValid = () => alert("유효하지 않은 데이터입니다");

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid, onNotValid)}>
        <input {...register("Email", { required: "이메일을 입력해주세요", minLength: { value: 5, message: "Your Email is too short" }, pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "네이버이메일만 허용합니다" } })} placeholder="Email" />
        <span>{errors.Email?.message}</span>
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
만약 네이버이메일만 허용해준다고 하면
/^[A-Za-z0-9._%+-]+@naver.com$/g
A-Z: 대문자 모두 허용
a-z: 소문자 모두 허용
0-9: 숫자 모두 허용
._%+-: 이러한 특수문자 허용
[]: 이 안에 있는 조합 모두 허용

maxLength: 10 값만 지정하던가
minLength: { value: 5, message: "Your Email is too short" } 유효성이 옳지 않았을때 메시지도 같이 지정하던가
 */
