import { useQuery } from "react-query";
import { fetchCoinHistory } from "../modules/api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";

import { isDarkAtom } from "../atom/todo";

interface IChartProps {
  coinId: string;
}

interface IChart {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IChart[]>(["chart", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 });
  const isDark = useRecoilValue(isDarkAtom);

  // https://apexcharts.com/docs/react-charts/ 공식문서에서 API를 살펴보면서 필요한 옵션들을 다 넣자
  return (
    <div>
      {isLoading ? (
        <h1>Loading chart...</h1>
      ) : (
        <ApexChart
          type="line"
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              width: 500,
              height: 500,
              toolbar: { show: false },
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            grid: { show: false },
          }}
          series={[
            {
              name: "sales",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
        />
      )}
    </div>
  );
}
export default Chart;
