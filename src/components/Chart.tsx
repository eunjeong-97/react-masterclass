interface IPriceProps {
  price: number;
}

function Chart({ price }: IPriceProps) {
  return <h1>{price}</h1>;
}
export default Chart;
