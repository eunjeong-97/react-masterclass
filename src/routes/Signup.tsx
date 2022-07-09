import { useForm } from "react-hook-form";

interface IForm {
  email:string;
  firstName: string;
  lastName: string;
  username: string;
  password1: string;
  password2: string;
  extraError?:string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (data: IForm) => {
    // 모든 input요소가 유효성검사에서 통과했을때 실행
    if(data.password1 !== data.password2) {
      setError('password2', {message: '비밀번호가 동일하지 않습니다'}, {shouldFocus:true});
    }
    setError('extraError',{message:'Server Offline!!'}); 
  }
  const onNotValid = () => alert("유효하지 않은 데이터입니다");

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid, onNotValid)}>
        <input {...register("Email", { required: "이메일을 입력해주세요", minLength: { value: 5, message: "Your Email is too short" }, pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "네이버이메일만 허용합니다" } })} placeholder="Email" />
        <span>{errors?.Email?.message}</span>
        <input {...register("FirstName", { required: true, validate:(value)=>value.includes('nico') ? "nico는 회원가입 못해!" : true})} placeholder="First Name" />
        <input {...register("LastName", { required: true, validate:{
          noNico:(value)=>value.includes('nico') ? "nico는 회원가입 못해!" : true,
          noEunJeong: (value)=>value.includes('eunjeong') ? "eunjeong은 회원가입 못해!" : true,
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

export default Signup;

/*
react-hook-form의 기능들은 register함수에서 일어난다
register함수는 useForm hook을 사용해서 가져올 수있고 
나는 register함수를 form안에 있는 모든 input에서 호출하는 것이다
다만 register함수가 구분할 수있도록 각각의 input요소에 이름을 붙여줘야 한다
그래야 react-hook-form이 data객체에 input값을 주고 에러를 확인할 수있다

validation에 검사규칙옵션을 설정하면 react-hook-form이 그 input에 대한 검사를 자동으로 해준다
validation규칙이 어떤건지 알려주기만 해도 된다

또한 react-hook-form은 여러 객체를 제공하는데 우리가 설정한 규칙과 메시지에 따라 알아서 채워지기 때문에 작업하기 간편하다

이러한 validation은 우리가 handleSubmit함수를 호출했을때 수행된다
handleSubmit함수또한 useForm hook에서 제공하는 함수인데 
form의 onSubmit이벤트에 두개의 인자를 받는 handleSubmit함수를 등록해야 하고
form데이터가 유효할 때 호출되는 onValid함수와 form데이터가 유효하지 않을 때 호출되는 onNotValid함수이다

onValid함수가 호출되었다면 form이 모든 validatin을 통과했고 모든 input의 입력값들이 다 정상적이고 에러가 없다는 말이다

그냥... recap내용을 다시 듣자...
 */
