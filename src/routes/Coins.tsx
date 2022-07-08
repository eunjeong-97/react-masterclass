import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import DarkModeToggle from "react-dark-mode-toggle";
import { Helmet } from "react-helmet";

import { fetchCoins, ICON_URL } from "../modules/api";
import { Container, Header, Title, Loader, CoinsList, Coin, Img } from "../components/Common";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  changeTheme: () => void;
  isDark: boolean;
}

function Coins({ changeTheme, isDark }: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <link rel="icon" href="https://ifh.cc/g/9LvAKA.png" />
      </Helmet>

      <Header>
        <Title>코인</Title>
        <DarkModeToggle onChange={changeTheme} checked={isDark} size={60} />
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`${ICON_URL}${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
