import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Container, Header, Title, Loader } from "../components/Common";

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

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const [loading, setLoading] = useState(true);

  // InfoData, PriceData타입이라고 알려줬기 때문에 초기값을 {}이라고 지정하지 않아도 된다
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)).json();
      setInfo(infoData);
      setPrice(priceData);

      // 콘솔창에서 우클릭하면 store object as global variable 선택을 하면 object data가 temp1에 저장된다
      // 우리가 각각의 데이터가 필요하게 되면 temp1, temp2에 접근해서 사용하면 된다
      console.log(infoData);
      console.log(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>"Loading..."</Loader> : null}
    </Container>
  );
}
export default Coin;

/*
API에서 받은 data의 타입지정을 좀더 편하게 하는법
1. API에서 받은 aata를 콘솔로그 해서 콘솔에서 확인한다
2. store object as global variable선택해서 temp1, temp2 식으로 저장되는걸 확인한다
3. API에서 받은 data의 인터페이스를 만든다
4. 콘솔창에서 Object.keys(temp1).join() 하면 string으로 나오는데 복사해서
5. 3번에서 만든 interface에 붙여넣고 , → :; 으로 변경 (command(ctrl) D로 쉼표선택)
6. 다시 콘솔창으로 돌아와서 Object.values(temp1).map(v=>typeof v).join() 해서 나온 하나의 string을 복사해서 코드에 붙여넣기
7. interface에 돌아와서 command(ctrl) shift L 누르고 커서나 나오면 붙여넣기

무엇이던 array타입이면 어떤 타입의 데이터로 구성된 array인지 타입스크립트에게 알려줘야한다
*/
