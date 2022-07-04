import React, { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "Default Value" }: CircleProps) {
  // 만약 아래와 같이 초기값을 지정하면 TypeScript는 counter의 타입은 number, setCounter는 number타입의 counter의 상태를 변화시키는 함수라는걸 알아차린다
  // 대부분 우리가 state를 만들때 type을 바꾸지 않기 때문에 좋다
  // const [counter, setCounter] = useState(1);
  // 즉, setCounter를 사용할땐 number데이터를 보낼거란걸 안다 그래서 만약 숫자나 문자열을 사용할것같다면
  // setCounter("hello"); 경고문구

  // 만약 counter의 타입을 string이나 number로 사용한다면 아래와 같이 적을 수도 있다
  const [counter, setCounter] = useState<number | string>(0);
  setCounter(2);
  setCounter("hello");
  setCounter(true); // 경고문구
  // 그래서 위처럼 특별하게 커스터마이징하지 않는 이상 state의 타입은 따로 지정하지 않고 초기값만 지정해주면 된다
  // 만약 default값을 넣어주지 않으면 counter, setCounter 모두 undefined가 된다
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
