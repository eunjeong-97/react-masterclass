import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchCoins } from "../modules/api";

import { Container, Header, Title, Loader, CoinsList, Coin, Img } from "../components/Common";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await res.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  // useQuery는 두개의 argument가 필요한데, queryKey(우리 query의 고유식별자)와 fetcher함수이다
  // useQuery는 isLoading이라는 boolean값을 return한다
  // useQuery hook이 fetcher함수 fetchCoins를 불러오고 fetcher함수가 isLoading이라면 react query가 말해줄것이다
  // 반대로 fetcher함수가 끝나도 react query가 말해줄것이다

  // 또한 fetcher함수인 fetchCoins가 반환하는 값을 data에 저장한다
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("data", data);
  }, [isLoading, data]);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {/* 여기서 코인리스트 100개씩 잘라줌 */}
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
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

/*
react query가 데이터를 캐시에 저장해두기 때문에 (데이터를 파괴하지 않는다)
Coin 상세페이지에 진입했다가 다시 Coins페이지에 돌아오면 더이상 로딩화면이 보이지 않는다 
즉, isLoading와 data는 데이터가 삭제되지 않는다
*/
