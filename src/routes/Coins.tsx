import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.li`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    // Link태그를 hover하면 색상이 변경되는데 이때 0.2초동안 서서히 바뀌는 애니메이션을 적용시킨다
    transition: color 0.2s ease-in;
    display: block; // 글씨 바깥~박스내부 영역을 클릭해도 페이지이동이 되도록 block으로 변경
    padding: 20px; // 패딩영역을 Link영역에 넣으면 글씨까지 진입하지 않아도 hover된걸로 인식이 되면서 유저에게 더 편한 환경을 제공할 수 있다
  }
  &:hover {
    // 실제 코드에서는 a태그를 사용하지는 않고 Link 컴포넌트를 사용했지만
    // react-router-dom의 Link컴포넌트들이 결국에는 anchor로 바뀌면서
    // react-router-dom이 우리 대신 설정을 도와줄 이벤트리스너도 있다
    // 즉 여기서 a태그는 Link태그를 말한다
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const coins = [
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          // a href를 하면 페이지가 새로고침되기 때문에 사용하지 않을것이다
          // 대신에 react-router-dom의 Link 컴포너트를 사용할거다
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}
export default Coins;

/*
일단 모든 screen들의 스타일을 한꺼번에 하지는 않을거지만
component없이 prototype하는 것을 먼저 보여줄 것이다

*/
