export function fetchCoins() {
  // json data의 Promise를 return해야 한다
  // await키워드를 반복해서 사용하는대신 promise를 대신 사용하면 좋을것같다
  // fetchCoin함수는 URL을 부르고 그 다음에 그 URL로부터 json을 return한다
  return fetch(`https://api.coinpaprika.com/v1/coins`).then((res) => res.json());
}
