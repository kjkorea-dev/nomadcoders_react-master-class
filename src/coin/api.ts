const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoiTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

const OHLCV_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 86400 * 14;
  return fetch(
    `${OHLCV_URL}?coinId=${coinId}&start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
