import { useParams } from "react-router-dom";

interface Params {
  coinId: string;
}

function Coin() {
  // 타입스크립트 생각에는 useParams()는 empty object일것같은데
  // 빈 객체에서 coinId값을 가져오려고 하니까 경고문구를 띄운다
  // 그래서 타입스크립트에게 우리 URL안에 몇몇개의 parameter가 있다고 알려주면 된다
  //   const { coinId } = useParams<{coinId:string}>(); // 타입스크립트에게 알려주는 방법1
  const { coinId } = useParams<Params>();
  console.log(coinId);
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;
