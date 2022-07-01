import styled from "styled-components";


function App() {
  return (
    // <div>
    //   <div style={{ backgroundColor: 'teal', width: 100, height: 100 }}></div>
    //   <div style={{ backgroundColor: 'tomato', width: 100, height: 100 }}></div>
    // </div>
    <Fater>
      <BoxOne>
        <Text>Hello</Text>
      </BoxOne>
      <BOxTwo />
    </Fater>
  );
}
//다크모드같은것도 쉽게 적용할 수 있다
// css모듈을 사용방식은 className 은 랜덤하게 적용된다
// 인라인으로 스타일속성을 입력하면 hover같은것도 적용못함
// styled-components를 사용하지 않으면 자바스크립트코드로 작성해야 하고 div의 나열하게 된다

const Fater = styled.div`
  display:flex;
`;

const BoxOne = styled.div`
  background-color:tomato;
  width:100px;
  height:100px;
`;

const BOxTwo = styled.div`
  background-color:teal;
  width:100px;
  height:100px;
`;

const Text = styled.span`
  color: white;
`;


export default App;
