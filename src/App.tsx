import React, { useContext, useState, useEffect } from "react";
import "./App.css";

// MaterialUI imports
import { Container } from "@material-ui/core";

// Container/Context imports
import DataContainer from "./containers/DataContainer";
import { ThemeContext } from "./context/ThemeProvider";
import { debounce } from "lodash";

// Component imports
import Header from "./components/Header/Header";

// Type import
import { IQuery } from "./api/fetchData";

function App() {
  const [query, setQuery] = useState<IQuery>({ currency: "usd", total: 12 });

  const handleQueryChange = (event: any) => {
    if (event.target.name === "amount_select") {
      setQuery({ ...query, ...{ total: event.target.value } });
    }
    if (event.target.name === "currency_select") {
      setQuery({ ...query, ...{ currency: event.target.value } });
    }
  };

  return (
    <Container maxWidth="lg">
      <Header handleQueryChange={handleQueryChange} query={query} />
      <DataContainer query={query}></DataContainer>
    </Container>
  );
}

export default App;
