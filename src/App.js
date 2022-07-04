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
// 다크모드를 구현할때 theme과 local estate management이 필요한데
// 오늘은 theme을 배워본다
// theme은 기본적으로 모든 색상들을 가지고 있는 object이라 유용하게 쓸 수 있다
// 색상을 바꾸고 싶을때 object를 바꾸면 된다

const Wrapper = styled.div`
  display:flex;
/* Wrapper나 Title은 어떤 theme의 backgroundColor인지 신경을 쓰지 않는다 */
/* ThemeProvider 안에 있는 theme object의 property만 가져오기만 한다 */
  background-color: ${props => props.theme.backgroundColor}
`;

const Title = styled.h1`
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