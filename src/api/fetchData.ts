const axios = require("axios").default;

export interface IQuery {
  currency: string;
  total: number;
}

// Call api using query parameters
export const fetchData = async (query: IQuery) => {
  let URL: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${query.currency}&order=market_cap_desc&per_page=${query.total}&page=1&sparkline=true`;
  console.log("Calling API...");
  const { data } = await axios.get(URL);
  return data;
};
