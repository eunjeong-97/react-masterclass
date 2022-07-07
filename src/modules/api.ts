const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  // Promise
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/ticker/${coinId}`).then((res) => res.json());
}
