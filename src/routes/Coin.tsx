import { useState, useEffect } from "react";
import { useLocation, useParams, Switch, Route } from "react-router-dom";
import styled from "styled-components";

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
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceData, setPriceData] = useState<PriceData>();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const coinData = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)).json();
      setInfo(infoData);
      setPriceData(coinData);
      setLoading(false);
    })();
  }, [coinId]);

  useEffect(() => {
    if (priceData) {
      setPrice(priceData.price_usd);
    }
  }, [priceData]);

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
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price price={123} />
            </Route>
            <Route path={`/${coinId}/chart`}>
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
nested router: route 안에 있는 또 다른 route
스크린 안에 많은 섹션이 나눠져있거나 브라우저에서 탭관리를 할때 유용하다
/btc-bitcoin/price, /btc-bitcoin/chart 이런식으로 URL을 활용해서 탭 활성화
*/
