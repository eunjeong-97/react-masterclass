import styled from "styled-components";


function App() {
  return (
    <Fater>
      <Box bgColor='teal' />
      <Circle bgColor='tomato' />
    </Fater>
  );
}

const Fater = styled.div`
  display:flex;
`;

const Box = styled.div`
  background-color:${props => props.bgColor};
  width:100px;
  height:100px;
`;

//Box의 속성을 다 받아오면서 새로운 스타일속성 추가
const Circle = styled(Box)`
border-radius:50%;
`
export default App;

