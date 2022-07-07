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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
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
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickerLoading, data: ticker } = useQuery<PriceData>(["ticker", coinId], () => fetchCoinTickers(coinId));
  const loading = infoLoading || tickerLoading;

  useEffect(() => {
    if (ticker) setPrice(ticker.price_usd);
  }, [ticker]);

  useEffect(() => {
    if (state) setName(state.name);
  }, [state]);

  return (
    <Container>
      <Header>
        <Title>{name !== "" ? name : "Loading.."}</Title>
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
              <Price price={Math.round(price)} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart price={123} coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;

/*
Chart 컴포넌트는 우리가 보고자 하는가격의 암호화폐가 무엇인지 알아야 한다
1. react-router-dom에서 useParams() hook를 활용할텐데 Chart버튼을 눌러서 Chart탭상태일때만 확인이 가능하다
(Chant내부에서 useParams()를 사용하는것이기 때문에)
만약 암호화폐를 보기 위해 Coin페이지에 와서 Chart를 누르지 않았다면 확인할 수 없다
2. router로부터 parameter가져온다

생각해보면 Coin페이지는 Chart 컴포넌트를 render하는 것이고
Coin페이지는 URL로부터 이미 coinId값을 알 수 잇다
그래서 Coin에서 확인하고 props로 전달해줄 것이다
*/
