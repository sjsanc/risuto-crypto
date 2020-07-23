import React, { useEffect, useState, useCallback } from "react";
import { fetchData } from "../api/fetchData";
import Item from "../components/Item/Item";
import { Grid } from "@material-ui/core";
// import { handleScroll } from "../services/useInfinite";

export default function DataContainer({ query }) {
  const [data, setData] = useState([]);

  // make an async call to the API upon mounting component
  useEffect(() => {
    fetchData(query).then((res) => setData(res));
    console.log(query);
  }, [query]);

  // log current data
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Grid container spacing={3}>
      {data.map((coin) => (
        <Item coin={coin} currency={query.currency} key={coin.id} />
      ))}
    </Grid>
  );
}
