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

// 다른파일에서도 rotationAnimation 애니메이션 사용가능
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

// extends: 컴포넌트의 모든 요소를 유지하면서 새로운 코드 추가
const Circle = styled(Box)`
  border-radius:50%;
`;

const Emoji = styled.span`
  font-size:36px;
`

export default App;