import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
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
    transition: color 0.2s ease-in;
    display: block;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

// const coins = [
//   {
//     id: "hex-hex",
//     name: "HEX",
//     symbol: "HEX",
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: "token",
//   },
//   {
//     id: "hex-hex",
//     name: "HEX",
//     symbol: "HEX",
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: "token",
//   },
//   {
//     id: "hex-hex",
//     name: "HEX",
//     symbol: "HEX",
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: "token",
//   },
// ];

// fetch해서 받을 coins데이터가 어떻게 생겼는지 타입스크립트에게 알려줘야 하기 때문에
// coins의 interface를 만들어줄 것이다
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // 이상태에서는 타입스크립트가 coins에 id나 name속성이 있는지 알지못한다
  // 그래서 타입스크립트에게 우리의 coins state는 coins로 이루어진 array라고 알려주면 된다
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // 특정한 상황에서만 함수가 실행되게 하기 위해서는 useEffect를 사용한다
  // useEffect함수를 사용하면, 컴포넌트가 시작될때 실행할지 컴포넌트가 끝날때 사용할지 아니면 뭐든 변화가 일어날때마다 실행할지 선택할 수 있다

  // 처음에만 실행되도록 설정
  // async await을 활용하면서 새로운 함수를 만들기 싫을때
  // 그 자리에서 바로 함수를 실행할 수 있는 방법
  // (() => console.log(1))();
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      console.log(json); // 9000개의 데이터가 있는데 이 중에서 100개만 가져오고 싶을때
      /*
      const array = [1,2,3,4,5];
      a.slice(0,2); // [1,2]
      */
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;

// 코인상세페이지에 갔다가 다시 오면 로딩화면이 다시 나오게 되는데
// 이는 screen이 바뀔때 state가 사라지고 couns screen에서 coin 상세페이지에 갈때도 state가 사라진다
// 즉, 유저가 다시 돌아올때마다 API를 다시 fetch해야 하는 상황인것이다
