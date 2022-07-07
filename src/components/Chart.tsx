import { useQuery } from "react-query";
import { fetchCoinHistory } from "../modules/api";

interface IChartProps {
  price: number;
  coinId: string;
}

function Chart({ price, coinId }: IChartProps) {
  const { isLoading, data } = useQuery(["chart", coinId], () => fetchCoinHistory(coinId));

  return <h1>Chart: {price}</h1>;
}
export default Chart;
