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
타입스크립트로 리액트 프로젝트를 하려면
nix create-reac-app —template typescript
이전처럼 styled-components 설치하고 theme 설정해야 함

이렇게 처음부터 하기 싫으면 타입스크립트를 설치해주면 된다
그리고 파일확장자를 .tsx로 변경하고 실행하면
리액트 라이브러리가 타입스크립트를 확인한다

타입스크립트는 styled-components를 알지 못한다
props가 뭔지 몰라서 에러를 발생시킨다

어떤 라이브러리나 패키지는 자바스크립트로 만들어졌기때문에 타입스크립트가 알지못한다
타입스크립트로 만들지 않은 라이브러리를 import할 땐, 타입스크립트를 위한 버전을 추가로 npm i해주면 된다 (tip을 확인해보자)

@types/styled-components

@types는 모든 유명한 nom 라이브러리 패키지를 가지고 있다
라이브러리나 패키지의 type definition을 알려준다

type definition은 styled-components의 소스코드를 보고 타입스크립트에게 해 줄 설명을 만들어 내는것이다
즉, definitionTyped 커뮤니티를 이용해서 패키지가 어떤 정보를 가지고 있는지 타입스크립트에게 알려주는건데
@type/ 명령어가 작동되지 않는다면 다른 방법으로 해야 한다
*/