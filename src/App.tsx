import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  // 만약 props.theme.bgCoolor라고 하면 존재하지 않는다고 타입스크립트가 알려준다
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Container>
      <H1>Hello</H1>
    </Container>
  );
}

export default App;

// @types/styled-components 패키지를 설치하면
// DefinitelyTyped는 기본적으로 타입스크립트에게 styled-components 패키지가 어떤건지 알려주고
// .d.ts 확장자를 가진 declaration file을 다운받아진다
// 마찬가지로 theme color를 활용하기 위해서 declaration file을 새로 만들어서 설정하면 된다
// styled.d.ts 파일 생성
