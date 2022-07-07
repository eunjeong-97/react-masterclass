interface IPriceProps {
  price: number;
}

function Price({ price }: IPriceProps) {
  return <h1>Price: {price}</h1>;
}
export default Price;
