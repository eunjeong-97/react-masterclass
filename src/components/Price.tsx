interface IPriceProps {
  price: number;
}

function Price({ price }: IPriceProps) {
  return <h1>오늘시세: {price} USD</h1>;
}
export default Price;
