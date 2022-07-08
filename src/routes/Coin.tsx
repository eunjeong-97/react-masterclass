import { useState, useEffect } from "react";
import { useLocation, useParams, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import DarkModeToggle from "react-dark-mode-toggle";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { fetchCoinInfo, fetchCoinTickers, ICON_URL } from "../modules/api";
import { isDarkAtom } from "../atom";

import { Container, Header, Title, Loader, TabWrap, OverViewWrap, Expl } from "../components/Common";
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

const OverView = styled.div<IOverView>`
  flex: 1;
  position: absolute;
  left: ${(props) => `${props.position.left}px`};
  right: ${(props) => `${props.position.right}px`};
  p {
    text-align: center;
    &:last-child {
      color: ${(props) => props.theme.bgColor};
    }
  }
`;

const Tab = styled.div<ITab>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: ${(props) => props.width}px;
  padding: 10px;
  background-color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.btnColor)};
  color: ${(props) => props.theme.bgColor};
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
  const isDark = useRecoilValue(isDarkAtom);

  // atom의 value을 감지하기 위해서는 useRecoilValue hook을 사용했지만
  // 이러한 atom의 value를 수정하기 위해선 useSetRecoilState hook을 사용한다
  // atom의 값을 변경하려면 modifier 함수를 사용하는데, 이 함수는 인자로 함수((prev: boolean) => !prev)를 받을 수 있다
  // 즉, modifier함수에게 이전상태를 주면 우리가 원하는 아무값이나 내가 원하는 값을 입력해서 반환이 가능하다
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const changeTheme = () => setDarkAtom((prev: boolean) => !prev);
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId), { refetchInterval: 5000 });
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
      <Helmet>
        <title>{name !== "" ? name : "Loading.."}</title>
        <link rel="icon" href={`${ICON_URL}${info?.symbol.toLowerCase()}`} />
      </Helmet>
      <Header>
        <Link to="/">
          <Tab width={100} isActive={false}>
            MainPage
          </Tab>
        </Link>

        <Title>{name !== "" ? name : "Loading.."}</Title>
        {/* useState처럼 이전value를 가지고와서 반대값으로 return해도 된다 */}
        <DarkModeToggle onChange={changeTheme} checked={isDark} size={60} />
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
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
