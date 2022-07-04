import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { dark, light } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={light}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

/*
typescript과 함께하는 ReactJS 섹션 정리

타입스크립트와 자바스크립트와의 차이점
자바스크립트에서는 코드 실행 전 타입에 대한 정의가 존재하지 않아서 내가 쓰는 코드 그대로 즉시 실행해버린다
만약 타입스크립트를 사용한다면 언어 자체에서 그 value들이 어떤 것인지, 어떤 type인지 확인한다
그러면 타입스크립트 언어는 나를 위해 코드가 실행되기 전에 value와 type을 검사해준다
그리고 만약 실수가 존재한다면, 내가 코드를 수정하기 전까지 실행을 멈춘다

타입스크립트에게 뭐가 뭔지를 설명해주는 작업은 아주 편한 작업이다 (? 말도 안돼....)
setup(초기설정)은 편하지 않지만 유지보수할때 끝내준다
예를 들어, 우리 테마의 타입이 무엇인지 아는 덕분에 우리의 테마가 string타입의 bgColor를 가진다는걸 알 수 있어서 실수를 안하게 된다

타입스크립트는 자바스크립트의 확장판이기 때문에 기존의 사용법과 크게 달라지지 않는다
기존의 타입스크립트는 함수에게 argument를 전달할때 변수 하나하나에 타입을 지정해서 전달해야 했지만,
const add = (a:number, b:number) => a+b;
이제는 컴포넌트를 생성해서 prop을 전달해주면 훨씬 편하게 할 수 있다
이렇게 하기 위해 prop의 타입들을 지정하는 방법을 배워야 하는데, 아래와 같이 interface를 통해 prop의 타입을 지정해서 알려주면 된다

interface: DummyProps {
    text:string;
}

function Dummy({text}: DummyProps) {
    return <h1>{text}</h1>;
}

<Dummy text='hello'/>

또한 interface의 property명 바로 뒤에 ?를 붙인다면 required가 아닌 optional값으로 지정할 수 있다

state의 default Value를 지정하면 타입스크립트에게 일일히 state의 타입을 지정하지 않아도 되지만
만약 number나 string 둘중 하나의 type을 가지게 된다면 커스텀형식으로 타입을 지정해줄수 있다

그리고 form이나 input처럼 event가 발생하는 지점에서 event의 타입또한 Typescript에게 알려주면 관련된 속성이나 메서드를 알 수 있다
이렇게 event의 타입을 지정해주는 것은 ReactJS에서만 해주면 된다

ReactJS는 자바스크립트의 실제 이벤트를 넘겨주는 것이 아니라 SyntheticEvent를 전달한다
그리고 이러한 SyntheticEvent은 기본적으로 ReactJS버전의 이벤트이다
ReactJS가 어느 다른 방식으로 이벤트들을 최적화할 수 있기 때문에 SyntheticEvent라고 부른다

만약 자바스크립트로 구성된 패키지나 라이브러리를 사용할때 DefinitelyTyped를 사용하면 되는데
만약 이렇게 타입스크립트에게 패키지/라이브러리의 내용을 알려주는 것이 없을때에는 경고문을 보게 된다
@types/styled-components같은 패키지를 npm i할때는 --save-dev 옵션을 추가해주면 된다
*/
