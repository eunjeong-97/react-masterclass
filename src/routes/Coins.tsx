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
    display: flex;
    align-items: center;
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

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
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
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
              {/* 우리가 원한다면 Link를 통해서 다른 화면에 정보를 보낼 수 있다 */}
              {/* <Link to={`/${coin.id}`}> */}
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`https://coinicons-api.vercel.app/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;

// 지금 app을 보면, API에서 데이터를 받아 뿌리는걸 알 수 있다
// 그래서 <Link/>버튼을 누르면 URL을 통해서 coin screen으로 우리가 누른 정보를 보내준다 parameter
// coin screen이 우리가 뭘 원하는지 파악해서 API로부터 요청할 것이다
// 이러한 과정들이 일어나는 동안 유저는 오직 로딩화면만 볼 수 있다
// 생각해보면 우리는 이미 코인에 대한 정보를 적어도 조금은 가지고 잇다
// 우리는 코인의 name을 알고 있는데 이정도면 충분하다

// 왜냐하면 Coin을 눌러서 상세페이지로 이동할때 로딩이 이루어지고
// 이러한 로딩이 끝나면 코인의 이름을 다시 한번 받아오게 되는것이다
// 이미 우리가 어떤 이름의 코인을 누르는지 알고 있는데 다시 로딩화면을 봐야하는것은 좋은 UI가 아니다

// 그래서 이번에는 우리가 보이지 않는 방식으로(비하인드더씬) 데이터를 어떻게 보내는지 알아볼것이다
// 생각해보면 우리가 화면을 이동할때 데이터를 보낸다는것은 parameter를 이용해서 URL에게 코인에 대한 정보를 넘기는 것이다
// 동일한 방식으로 한 화면에서 다른 화면으로 정보를 받아올 수도 잇을것이다
// 그냥 URL을 쓰는것말고 또 다른 옵션은 state를 사용하는 것이다
// state는 비하인드 더 씬 소통같은것이다
// react router dom에서 Link를 사용할땐 string을 사용해도 되지만 object를 사용해도 된다

// object타입의 데이터를 보내는 Link를 클릭하면 다른화면으로 state를 보내는 것이다
// 다만, <Link to={{ pathname: `/${coin.id}`, state: { name: coin.name }, }}> 으로 데이터를 보내게 되면 보기가 좋지 않은데
