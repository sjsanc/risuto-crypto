import React, { useContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ThemeProvider } from "./context/ThemeProvider";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
