import { useForm } from "react-hook-form";

interface IForm {
  email:string;
  firstName: string;
  lastName: string;
  username: string;
  password1: string;
  password2: string;
  // 서버 전체에 대한 에러발생을 위해 옵션추가
  // 특정한 항목에 해당하는 에러가 아니라 전체 form에 해당하는 에러
  extraError?:string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // data의 type을 IForm으로 변경
  const onValid = (data: IForm) => {
    console.log('onValid');
    if(data.password1 !== data.password2) {
      console.log(data)
      // 에러발생
      // IForm에서 설정한 옵션만 선택가능
      // form에서 내가 고른 input항목에 강제로 focus시킬 수있다
      setError('password2', {message: '비밀번호가 동일하지 않습니다'}, {shouldFocus:true});
    }
    // form전체에 대한 error발생
    // 원한다면 form의 끝부분이나 버튼 아래에 표시할 수 있다
    // setError는 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 해준다
    setError('extraError',{message:'Server Offline!!'}); 
  }
  const onNotValid = () => alert("유효하지 않은 데이터입니다");

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid, onNotValid)}>
        <input {...register("Email", { required: "이메일을 입력해주세요", minLength: { value: 5, message: "Your Email is too short" }, pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "네이버이메일만 허용합니다" } })} placeholder="Email" />
        {/* required이거나 정규식에 부합되지 않으면 에러가 발생한다 
        ?를 붙여야 errors나 Email이 발생했을때만 message를 찾는다
        */}
        <span>{errors?.Email?.message}</span>
        {/* 만약 Nico이거나 Nico를 포함시키는 이름은 회원가입을 시키지 않는다하면
        validate는 함수를 값으로 가지고 인자는 현재 입력된 값을 가지고 반환되는값이 false면 에러발생
        만약 문자열을 반환하면 해당 문자열이 에러메시지를 return한다는 뜻이다
        validate는 하나의 함수나 여러 개의 검사를 할 수 있도록 여러 함수가 있는 객체가 될 수 있다
        */}
        <input {...register("FirstName", { required: true, validate:(value)=>value.includes('nico') ? "nico는 회원가입 못해!" : true})} placeholder="First Name" />
        <input {...register("LastName", { required: true, validate:{
          noNico:(value)=>value.includes('nico') ? "nico는 회원가입 못해!" : true,
          noEunJeong: (value)=>value.includes('eunjeong') ? "eunjeong은 회원가입 못해!" : true,
          // 비동기함수도 가능
          // noOverlap: async(value)=> {}
        } })} placeholder="Last Name" />
        <input {...register("Username", { required: "UserName is required", maxLength: 10 })} placeholder="Username" />
        <input {...register("password1", { required: true, minLength: {value:5,message:"5글자이상의 비밀번호를 입력하세요"} })} placeholder="Password1" />
        <span>{errors.password1?.message}</span>
        <input {...register("password2", { required: true, minLength: {value:5,message:"5글자이상의 비밀번호를 입력하세요"}})} placeholder="Password2" />
        <span>{errors?.password2?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;

/*
추가적인 조건에 따라 추가 검사를 해야 하는 경우
에러를 발생시키는 방법
내가 원하는 규칙에 따라 검사: API를 활용해서 검사해야 하는 경우
우선 사용자가 적을 수있게 허용한 다음에 사용자가 적는 도중에 API에 요청을 보내서 사용자명이 이미 존재하는지의 여부 확인
만약 사용자명이 이미 존재한다면 사용자에게 즉시 알려준다

기존에는 required이나 정규식을 활용해서 에러를 발생시켜줬는데 
만약 password1과 password2가 서로 동일하지 않을 때 에러를 발생시킨다면
모든 form들이 하는 것처럼 비밀번호를 요구하고 나서 비밀번호를 확인하게 하고 password1과 password2가 동일하지 않을 때 에러를 발생시킨다

그리고 form 전체에 대한 error를 발생시킬 수 있는데
만약 사용자가 form을 제출하면 form을 백엔드로 전달할 때 누군가 서버를 해킹해서 서버가 다운되서 접속이 끊겼을 때 
유저에게 서버가 다운되었다는 에러를 보여주고 싶을때 활용할 수 있다

에러를 발생시킨 input요소에 자동으로 커서가 선택하게 하고 싶음
setError()함수에 {shouldFocus: true} 객체를 전달시킨다
 */
