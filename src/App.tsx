import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  // 기본적으로 event는 any타입을 받는다고 되어잇는데
  // 가능한 any타입을 받지 않도록 지정하는 것이 좋다 (이것이 TypeScript를 사용하는 이유)
  // 그래서 event의 타입을 React의 FormEvent라고 알려주면 되는데 나 혼자서는 알 수 없다
  // 그래서 공식문서를 읽거나 구글링을 통해 찾아서 이벤트의 type을 알려주면 된다
  // React.FormEvent에 커서를 대면 interface React.FormEvent<T = Element> 라고 나오는데
  // 어떤 종류의 Element가 onChange이벤트를 발생시키는지 특정할 수 있다
  // 그러한 Element를 HTMLInputElement라고 적어줬다
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // 그동안은 event.target이라고만 했는데 event.currentTarget이라고 하는 이유는
    // ReactJS TypeScript 사람들은 target대신 curretTarget 사용을 선택했기 때문이다
    console.log(event.currentTarget.value);

    // object타입의 구조분해할당: event.currentTarget.value 변수를 추출한다
    const {
      currentTarget: { value },
    } = event;

    // TypeScript로부터 value의 값은 string이어야 한다고 검사받고
    // 이러한 onChange이벤트가 type='text'인 input에 의해 만들어졌으며
    // currentTarget의 value가 string이라는걸 TypeScript가 알기 때문에
    // TypeScript에게 어떤 event가 일어나고 잇는지만 설명해주면 된다
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 만약 자바스크립트라면, event.prevettnDefaulT(); 라고 입력해도 바로 경고문구가 나오지 않고 npm run start를 해서 프로젝트를 실제로 실행해야 에러가 나오면서 잘못된 것을 알 수있다
    // 따라서 테스트해볼때, 작동할지 않을지도 모르지만 왜 작동하지않는지 모르게 된다
    // 지금처럼 event의 타입을 지정하게 되면 TypeScript가 나에게 preventDefault()함수를 알려주게 된다
    console.log("hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="username" value={value} onChange={onChange} />
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
