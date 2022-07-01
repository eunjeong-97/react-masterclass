import styled, { keyframes } from "styled-components";


function App() {
  return (
    <Wrapper>
      <Box>
        <span>🎃</span>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
`;

const rotationAnimation = keyframes`
  /* from {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  to {
    transform:rotate(360deg);
    border-radius:100px;
  } */
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
  span {
    font-size:36px;
    &:hover {
      // span을 hover했을때
    }
    &:active {
      // span가 active되었을때
      // 마우스를 클릭하면 active 클릭하지 않은상태면 active하지 않음
    }
  }
`;