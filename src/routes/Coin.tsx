import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

// useLocation()에서 받은 state의 타입
interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();

  // Coins에서 전달해준 데이터를 받는방법: react router DOM이 보내주는 location object에 접근하면 된다
  // console.log(useLocation()); pathname와 state 등의 데이터를 받아온다
  // location에서의 state에서 우리가 원하는 코인이름을 가져다 title에 넣어주면 된다
  const { state } = useLocation<RouteState>(); // 처음에는 state의 타입을 알 수 없기 때문에 name 변수를 받아올 수 없기 때문에 타입스크립트에게 타입을 알려준다 (=interface)
  // 즉, 여기서 꺼내는 state변수는 string타입의 name속성을 가지는 object라고 알려준다
  //  const {state: {name}} = useParams(); interface에 표현을 못하기 때문에 이렇게 구조분해할당은 못한게 아닐까 싶다

  return (
    <Container>
      <Header>
        {/* <Title>{state.name}</Title> */}
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>"Loading..."</Loader> : null}
    </Container>
  );
}
export default Coin;

// 이러한 코인이름은 state이고,
// state는 우리가 Coins페이지에 진입할때와 Coin 상세페이지에 진입할때 생성된다
// 그리고 Coins페이지에서 Coin컴포넌트를 클릭해서 이동할때 state가 Coins → Coin페이지로 보내지는것이다
// 그래서 새로운페이지에서 바로 상세페이지에 진입하려고 하면 state가 undefined라는 에러를 보게 되는데 state가 정의되지 않아서 발생하는 것이다
// Coin페이지에서 필요한 state는 Coins페이지를 먼저 열어야 생기는 것이기 때문이다

// 이러한 문제를 해겷하기 위해서는 {state.name} → state?.name || "Loading" 이라고 수정
// state가 존재하면 name을 가져오고 그렇지 않을때에는 Loading... 글씨를 보여주면 된다
