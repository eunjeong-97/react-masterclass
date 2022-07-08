import { useQuery } from "react-query";
import { fetchCoinHistory } from "../modules/api";
import ApexChart from "react-apexcharts";

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

  // https://apexcharts.com/docs/react-charts/ 공식문서에서 API를 살펴보면서 필요한 옵션들을 다 넣자
  return (
    <div>
      {isLoading ? (
        <h1>Loading chart...</h1>
      ) : (
        <ApexChart
          type="line"
          options={{
            theme: { mode: "dark" },
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

/*
API로부터 받은 data를 시각화
자바스크립트 chart 라이브러리인 apexcharts를 활용

*/
