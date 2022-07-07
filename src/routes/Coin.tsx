import { useState, useEffect } from "react";
import { useLocation, useParams, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

import { fetchCoinInfo, fetchCoinTickers } from "../modules/api";

import { Container, Header, Title, Loader } from "../components/Common";
import Price from "../components/Price";
import Chart from "../components/Chart";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  price_usd: number;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IOverView {
  margin?: {
    right?: string;
    left?: string;
  };
  position: {
    left?: number;
    right?: number;
  };
}

interface IOverViewItem {
  title: string;
  expl: any;
  position: {
    left?: number;
    right?: number;
  };
}

interface ITab {
  width?: number;
  isActive: boolean;
}

const OverViewWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${(props) => props.theme.purple};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
`;

const OverView = styled.div<IOverView>`
  flex: 1;
  position: absolute;
  left: ${(props) => `${props.position.left}px`};
  right: ${(props) => `${props.position.right}px`};
  p {
    text-align: center;
    &:last-child {
      color: ${(props) => props.theme.blue.dark};
    }
  }
`;

const Expl = styled.p`
  margin: 20px 0;
`;

const TabWrap = styled.div`
  // grid를 활용해서도 만들어보자
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Tab = styled.div<ITab>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: ${(props) => props.width}px;
  padding: 10px;
  background-color: ${(props) => (props.isActive ? props.theme.blue.light : props.theme.blue.dark)};
  color: ${(props) => props.theme.gray.dark};
`;

const OverViewItem = ({ title, expl, position }: IOverViewItem) => {
  return (
    <OverView position={position}>
      <p>{title}</p>
      <p>{expl === true ? "YES" : expl}</p>
    </OverView>
  );
};

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceData, setPriceData] = useState<PriceData>();
  const [price, setPrice] = useState(0);
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //     const coinData = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)).json();
  //     setInfo(infoData);
  //     setPriceData(coinData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  // 이렇게 만들면 queryKey가 동일해지기 때문에 좋지 않다
  // 하지만 devtools를 보면 react query가 queryKey를 array로 보는걸 알 수있기 때문에 배열형태로 key를 정해준다
  // isLoading과 data도 동일한 이름이면 곤란하기 때문에 구조분해할당 rename을 활용해서 아래와 같이 활용한다
  // 그리고 useQuery hook으로 받는 데이터의 타입을 알려주기 위해 interface도 해준다
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickerLoading, data: ticker } = useQuery<PriceData>(["ticker", coinId], () => fetchCoinTickers(coinId));

  useEffect(() => {
    if (ticker) {
      setPrice(ticker.price_usd);
    }
  }, [ticker]);

  const loading = infoLoading || tickerLoading;

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          <OverViewWrap>
            <OverViewItem title="RANK" expl={info?.rank} position={{ left: 10 }} />
            <OverViewItem title="SYMBOL" expl={info?.symbol} position={{ left: 195 }} />
            <OverViewItem title="OPEN SOURCE:" expl={info?.open_source} position={{ right: 10 }} />
          </OverViewWrap>
          <Expl>{info?.description}</Expl>
          <OverViewWrap>
            <OverViewItem title="HASH ALGORITHM" expl={info?.hash_algorithm} position={{ left: 10 }} />
            <OverViewItem title="LAST DATA AT:" expl={info?.last_data_at.substring(0, 10)} position={{ right: 10 }} />
          </OverViewWrap>
          <Expl>현재 시세: {Math.round(price)} USD</Expl>

          <TabWrap>
            <Link to={`/${coinId}/price`}>
              <Tab width={190} isActive={priceMatch !== null}>
                PRICE
              </Tab>
            </Link>
            <Link to={`/${coinId}/chart`}>
              <Tab width={190} isActive={chartMatch !== null}>
                CHART
              </Tab>
            </Link>
          </TabWrap>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price price={123} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart price={123} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;

/*
react query는 API로부터 response를 받고 그러한 응답을 캐싱한다
우리가 다른페이지에 갔다가 재진입 하더라도 캐싱되어잇기 때문에 API에 다시 호출하지 않는다
*/
