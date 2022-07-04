import styled from "styled-components";

// Container 컴포넌트에게 전달하고 싶은 props의 타입을 지정한다
// 지금의 코드로 보면, bgColor 하나의 props을 보낸다는 점에서 CircleProps와 동일하긴 하지만
// 대부분의 경우 CircleProps이 더 많은 props를 받고, ContainerProps는 그 중 일부의 props만 받을 것이기 때문에 다를것이다
//
interface ContainerProps {
  bgColor: string;
}

// TypeScript에게 Container가 bgColor props 하나만을 받을거라고 알려주기 위해
// 위에서 정의한 ContainerProps를 아래와 같이 태그명옆에 붙여써주면 된다
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
`;

// 내가 원하는대로 이름을 지어주면 된다
// TypeScript에게 prop의 타입을 알려주기 위한 interface방식
// interface는 TypeScript에게 object가 어떻게 보일지 설명해주는 방식이다
interface CircleProps {
  // TypeScript에게 bgColor는 string이어야 한다고 설명한다
  // 그리고 이러한 bgColor는 CircleProps object안에서 확인가능하다
  bgColor: string;
}

// 위에서 interface로 지정하고 props로 받는 CircleProps의 타입이 뭔지 Circle Component에게 알려준다
// {bgColor}: 라고 하는것은 CircleProps의 object라고 하는것이다
// 만약 {bgColor, x}: 라고 입력하게 되면 변수 x는 bgColor 안에 존재하지 않는다고 경고문구를 남겨준다
function Circle({ bgColor }: CircleProps) {
  // function Circle({ props: CircleProps }) { 이런식으로 props 자체를 받아도되지만, 구조분해할당을 하는것이 일반적이다
  // return <Container bgColor={props.bgColor} />; 위처럼 props를 받았을때 Container에게 bgColor 전달
  // 여기서 TypeScript가 봤을때에는 Container가 div인데, 이러한 div는 아무런 props을 받지 않아서 경고문구가 나온다
  // 그래서 TypeScript에게 bgColor를 Container component에게도 보내고 싶다고 알려주면 된다
  return <Container bgColor={bgColor} />;
}

export default Circle;

// 만약 bgColor라는 prop이 필수적으로 필요하다고 가정할때
// bgColor가 뭔지 TypeScript에게 알려주기 위해 interface라는걸 할 것이다
// interface object shape(객체모양)을 TypeScript에게 설명해주는 TypeScript개념이다
// 이전에는 아래와 같은 방식으로 사용해서 변수 a와 b의 타입을 TypeScript에게 설명해줬지만 인터페이스로 알려주면 더 편하다
// const x = (a:number, b:number) => a+b;

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "nico", age: 12 });
sayHello({ name: "hi", age: 121, hello: 1 }); // hello는 PlayerShape안에 없다고 경고문구를 띄워준다
