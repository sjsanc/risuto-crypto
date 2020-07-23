import React, { useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import {
  Card,
  Grid,
  Typography,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import Chart from "chart.js";
import style from "./Item.module.css";

export default function Item({ coin, currency }: any) {
  const { theme } = useContext(ThemeContext);

  const ctxRef = useRef<HTMLCanvasElement>(null);

  const secondaryCardColors =
    theme === "secondary"
      ? {
          color: "white",
          backgroundColor: "rgb(66, 66, 66)",
          chartColor: "#f50057",
        }
      : { color: "black", backgroundColor: "white", chartColor: "#C3F3FD" };

  const cleanSparklines = () => {
    let sparkData = coin.sparkline_in_7d.price;
    let averages = [];
    for (let i = 0; i < sparkData.length; i++) {
      let avg = 0;
      avg += sparkData[i];
      if (i % 24 === 0) {
        averages.push(avg / 24);
        avg = 0;
      }
    }
    // console.log(averages);
    return averages;
  };

  useEffect(() => {
    // Remove possibility of null type for ctx
    // https://fettblog.eu/typescript-react/hooks/#useref
    let ctx: any;
    if (ctxRef && ctxRef.current) {
      ctx = ctxRef.current.getContext("2d");
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            data: cleanSparklines(),
            backgroundColor: secondaryCardColors.chartColor,
            fill: true,
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
            },
          ],
          xAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  }, [theme]);

  return (
    <Grid item lg={3} md={6} xs={12}>
      <Card
        className={style.item}
        style={{
          color: secondaryCardColors.color,
          backgroundColor: secondaryCardColors.backgroundColor,
        }}
      >
        <CardMedia
          image={coin.image}
          className={style.image}
          title={coin.name}
        />
        <CardContent className={style.content}>
          <Typography variant="h5">{coin.name}</Typography>
          <Typography variant="caption" display="block">
            Current Price
          </Typography>
          <Typography variant="button" display="block">
            {coin.current_price.toFixed(2) + " " + currency}
          </Typography>
          <Typography variant="caption">({coin.current_price})</Typography>
        </CardContent>
        <canvas id={coin.id + "Chart"} ref={ctxRef}></canvas>
      </Card>
    </Grid>
  );
}
