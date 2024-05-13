import * as Mui from "@mui/material";

export const OrderButton = ({
  coin,
  order,
  handleBuy,
  handleSell,
}: orderButton.Props) => (
  <Mui.Stack
    direction="row"
    justifyContent="space-between"
    spacing={1}
    id="orderType"
  >
    <Mui.Button
      size="small"
      variant={order === "sell" ? "contained" : "outlined"}
      color="error"
      fullWidth
      onClick={handleSell}
    >
      Sell {coin}
    </Mui.Button>
    <Mui.Button
      size="small"
      variant={order === "buy" ? "contained" : "outlined"}
      color="success"
      fullWidth
      onClick={handleBuy}
    >
      Buy {coin}
    </Mui.Button>
  </Mui.Stack>
);

export declare namespace orderButton {
  export interface Props {
    coin: string;
    order: "buy" | "sell";
    handleBuy: () => void;
    handleSell: () => void;
  }
}
