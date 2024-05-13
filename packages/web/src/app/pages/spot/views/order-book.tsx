import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const OrderBook = ({
  coin,
  orderBook,
  nativeCurrency,
  nativePrice,
}: {
  coin: Hooks.Main.UseCoin.coin;
  orderBook: Hooks.Main.BinanceResponse.orderBook | undefined;
  nativeCurrency: string;
  nativePrice: number;
}) => {
  const [_, setPrice] = React.useState<number>(coin?.current_price);
  const [color, setColor] = React.useState<"success.main" | "error.main">(
    "success.main"
  );
  const { coinId } = Router.useParams();

  React.useEffect(() => {
    setPrice((prev) => {
      setColor(
        prev > (coin?.current_price || 0) ? "error.main" : "success.main"
      );
      return coin?.current_price;
    });
  }, [coin?.current_price?.toString(), coinId]);

  const buyData = orderBook?.asks?.length
    ? [...orderBook.asks]
        .slice(0, 7)
        .reverse()
        .map((trade) => ({
          price: (
            <Mui.Typography variant="inherit" color="success.main">
              <Components.Global.Format number={trade[0]} type="number" />
            </Mui.Typography>
          ),
          size: <Components.Global.Format number={trade[1]} type="number" />,
          total: (
            <Components.Global.Format
              number={trade[0] * trade[1]}
              type="number"
            />
          ),
        }))
    : [];
  const sellData = orderBook?.bids?.length
    ? orderBook.bids.slice(0, 7).map((trade) => ({
        price: (
          <Mui.Typography variant="inherit" color="error.main">
            <Components.Global.Format number={trade[0]} type="number" />
          </Mui.Typography>
        ),
        size: <Components.Global.Format number={trade[1]} type="number" />,
        total: (
          <Components.Global.Format
            number={trade[0] * trade[1]}
            type="number"
          />
        ),
      }))
    : [];

  return (
    <Components.Global.Container
      justifyContent="flex-start"
      sx={{
        width: document?.getElementById("recentTrades")?.clientWidth || {
          xs: "100%",
          md: 350,
        },
        height: 440,
      }}
      customTitle={
        <Mui.Typography variant="subtitle1" fontWeight="bold">
          Order Book
          <Mui.Typography variant="caption" color="text.secondary">
            ({coinId?.replace("_", "/")})
          </Mui.Typography>
        </Mui.Typography>
      }
    >
      <Pages.Spot.Views.Table
        id="orderBookBuy"
        titles={[`Price(${coin?.currency})`, "Size", "Total"]}
        data={buyData}
        // hide
        height
      />
      <Mui.Typography
        variant="body2"
        sx={{ display: "flex", alignItems: "center" }}
        color={color}
      >
        <Components.Global.Format number={coin.current_price} type="number" />
        {color === "success.main" ? (
          <MuiIcons.ArrowUpward fontSize="small" />
        ) : (
          <MuiIcons.ArrowDownward fontSize="small" />
        )}
        <Mui.Typography variant="caption" color="text.secondary">
          <Components.Global.Format
            number={coin.current_price * nativePrice}
            type={nativeCurrency}
          />
        </Mui.Typography>
      </Mui.Typography>
      <Pages.Spot.Views.Table
        id="orderBookSell"
        titles={[`Price(${coin?.currency})`, "Size", "Total"]}
        data={sellData}
        hide
        height
      />
    </Components.Global.Container>
  );
};
