import styled from "styled-components";


function App() {
  return (
    <Fater>
      <Box bgColor='teal' />
      <Circle bgColor='tomato' />
      <Btn>Login</Btn>
      {/* Btn의 스타일속성을 사용하면서 html의 a태그를 사용한다 */}
      <Btn as='a' href='/'>Login</Btn>
      <Input />
      <Input />
      <Input />
      <Input />
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

const Circle = styled(Box)`
border-radius:50%;
`
export default App;

// 컴포넌트의 태그를 바꾸고 싶은데 스타일은 바꾸고 싶지 않는경우
//예를 들어 button을 사용하면서 href속성을 사용하고 싶을때
// Btn태그를 사용하지만 button을 사용하지 않을때 as속성을 사용한다
const Btn = styled.button`
  color: white;
  background-color:tomato;
  border:0;
  border-radius:15px;
`;

// Btn속성을 확장한 Link 컴포넌트생성
const Link = styled(Btn)``;

// styled-components가 컴포넌트를 생성할 때 속성값 설정
// 실제 Input컴포넌트에서 required나 minlength속성을 부여한것과 동일한 효과
const Input = styled.input.attrs({ required: true, minlength: 0 })`
  background-color:tomato;
`;