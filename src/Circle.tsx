import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string; // required
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  /* borderColor값이 required이기 때문에 스타일에서 꼭 사용해줘야 한다 */
  border: 1px solid ${(props) => props.borderColor};
`;

// default props vs optional props 차이
// 만약 App.tsx에서 <Circle />이라고 입력하면 bgColor가 필요한데 입력하지 않았다고 경고문구를 보여준다
// borderColor는 property명 뒤에 ?를 추가함으로써 optional으로 설정할 수 있다 (string || undefined)
interface CircleProps {
  bgColor: string;
  borderColor?: string; // optional
  // borderColor?: string | undefined; // 다른방법
  text?: string; //옵션으로 지정하면 defauly Value 지정가능(?)
}

function Circle({ bgColor, borderColor, text = "Default Value" }: CircleProps) {
  // CircleProps에서는 borderColor를 optional로 설정하고
  // ContainerProps에서는 borderColor를 required로 설정하면
  // string || undefined로 받을 수 잇기 때문에 TypeScript가 경고해준다
  // 따라서 undefined로 받았을때도 default값을 전달할 수 있도록 초기값을 TypeScript에게 알려주면 된다
  // 만약 borderColor가 잇다면 borderColor값으로 넘겨주고, undefined로 받아서 없다면 borderColor값을 bgColor로 넘겨주면 된다
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
