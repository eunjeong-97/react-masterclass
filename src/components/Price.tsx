interface IPriceProps {
  price: number;
}

function Price({ price }: IPriceProps) {
  return <h1>{price}</h1>;
}
export default Price;
