import React, { useContext } from "react";
import {
  FormControl,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import { ThemeContext } from "../../context/ThemeProvider";
import style from "./HeaderStyles.module.css";
import PropTypes, { InferProps } from "prop-types";
import { IQuery } from "../../api/fetchData";

export default function Header({ handleQueryChange, query }: any) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  //   Hack fix for Material's stupid classes
  const textTheme: string = theme === "primary" ? "black" : "white";
  console.log(theme);

  return (
    <header className={style.header}>
      <h1>
        <span className="hidden">Risuto・</span>
        <span>リスト</span>
      </h1>
      <div>
        <FormControlLabel
          className={style.toggle}
          control={<Switch color={theme} />}
          label={theme === "primary" ? "日" : "夜"}
          onChange={toggleTheme}
        />
        <FormControl color={theme} className={style.currencySelect}>
          <InputLabel id="currency_select_label" style={{ color: textTheme }}>
            CURRENCY
          </InputLabel>
          <Select
            labelId="currency_select_label"
            id="currency_select"
            name="currency_select"
            color={theme}
            style={{ color: textTheme }}
            onChange={handleQueryChange}
            value={query.currency}
          >
            {["usd", "jpy", "gbp", "eur"].map((currency: string) => (
              <MenuItem key={currency} value={currency}>
                {currency.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl color={theme} className={style.amountSelect}>
          <InputLabel id="amount_select_label" style={{ color: textTheme }}>
            TOTAL
          </InputLabel>
          <Select
            labelId="amount_select_label"
            id="amount_select"
            name="amount_select"
            style={{ color: textTheme }}
            onChange={handleQueryChange}
            value={query.total}
          >
            {[4, 8, 12, 24, 50, 100].map((amount: number) => (
              <MenuItem key={amount} value={amount}>
                {amount}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </header>
  );
}
