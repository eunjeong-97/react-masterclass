const BASE_URL = "https://api.coinpaprika.com/v1";
const NICO_URL = "https://ohlcv-api.nomadcoders.workers.dev";
export const ICON_URL = "https://coinicons-api.vercel.app/api/icon/";
export const FAVICON_URL = "https://ifh.cc/g/9LvAKA.png";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/ticker/${coinId}`).then((res) => res.json());
}

export function fetchCoinHistory(coinId: string) {
  return fetch(`${NICO_URL}?coinId=${coinId}`).then((res) => res.json());
}
