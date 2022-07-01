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
`;

const rotationAnimation = keyframes`
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

  // Box컴포넌트 내부에 있는 span태그 selector
  //만약 html태그명에 의존하고 싶지 않을때, styled-components를 타겟팅
  ${Emoji}:hover {
      font-size:98px;
    }
`;

const Emoji = styled.span`
  font-size:36px;
`

export default App;