import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Container, Header, Title, Loader } from "../components/Common";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});

  useEffect(() => {
    (async () => {
      // await fetch가 response를 가져다 주기 때문에 괄호로 감싼다: 캡슐화
      // 즉 괄호 안의 내용은 response가 된다
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)).json();
      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {/* 이런식으로 API에게 받은 data를 바탕으로 화면에 보여준다고 코드를 작성하면
      타입스크립트가 매번 interface를 통해 타입을 알려달라고 경고문구를 보여주는데
      매번 interface를 작성하면 번거롭기 때문에 자동으로 타입스크립트에게 타입을 알려주게 할 수 있지만 다음에 알아보자 */}
      {loading ? <Loader>"Loading..."</Loader> : <span>{info.hello}</span>}
    </Container>
  );
}
export default Coin;
