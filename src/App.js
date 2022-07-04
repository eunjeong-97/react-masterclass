import styled, { keyframes } from "styled-components";


function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as='p'>🎃</Emoji>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
  background-color: ${props => props.theme.backgroundColor}
`;

const Title = styled.h1`
/* texttColor라고 적어도 에러를 발생하지 않고 작동을 안하는 경우도 잇는데 TypeScript의 도움을 받으면 에러생성가능*/
color: ${props => props.theme.textColor}
`

export const rotationAnimation = keyframes`
0% {
  transform:rotate(0deg);
  border-radius:0px;
}
50% {
  transform:rotate(360deg);
  border-radius:100px;
}
100%{
  transform:rotate(0deg);
  border-radius:0px;
}
`;

const Box = styled.div`
  width:100px;
  height:100px;
  background-color:tomato;
  animation: ${rotationAnimation} 1s linear infinite;
  display:flex;
  justify-content:center;
  align-items:center;

  ${Emoji}:hover {
      font-size:98px;
    }
`;

const Circle = styled(Box)`
  border-radius:50%;
`;

const Emoji = styled.span`
  font-size:36px;
`

export default App;

/*
TypeScript는 JavaScript를 기반으로 한 프로그래밍 언어이다
TypeScript는 자바스크립트 복붙이지만 새로운 기능 추가된거
function이나 array, method 만드는 등등 동일함
기존의 코드를 고칠 필요는 없다

Strongly-typed: 프로그래밍 언어가 작동하기 전에 data의 type을 확인한다

const plus = (a,b) => a+b;
plus(2,2); // 4
plus(2, ‘hi’); // ‘2hi’

이러한 실수를 막기 위해 자바스크립트에게 a,b는 언제나 number라고 알려주고 싶다
즉, 코드에 실수가 있어도 프로그램이 작동하기 전에 Typescript가 나에게 알려준다

const user = {
  firstName: ‘Angela’,
  lastName: ‘Davis’,
  role: ‘Professor’,
};
console.log(user.name); // undefined

TypeScript이라면 user.name은 존재하지 않는다고 말해준다
이럴 때 자바스크립트가 error를 내주면 좋겠지만 undefined만 낸다

const plus = (a:number, b:number) => a+ b;
plus(1,1);  // 2
plus(‘a’, 1); // 빨간줄로 에러줄

이런식으로 TypeScript는 작은 실수로부터 막아줌

브라우저가 이해할 수 있는 유일한 프로그래밍언어는 타입스크립트
브라우저는 타입스크립트를 이해하지 못한다
사용자에게 publish할 때 컴파일할 때 자바스크립트가 된다
타입에 별 문제가 없으면 자바스크립트로 컴파일해서 실행
*/