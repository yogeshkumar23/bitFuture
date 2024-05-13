import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Balance = ({
  amountBalance,
  coinBalance,
  coin,
}: {
  amountBalance: number;
  coinBalance: number;
  coin: Hooks.Main.UseCoin.coin;
}) => (
  <Mui.Stack
    id="coinPairBalance"
    sx={{
      bgcolor: (theme) =>
        theme.palette.mode === "dark"
          ? `#ffffff10`
          : `${theme.palette.primary.main}10`,
      border: (theme) =>
        `1px solid ${
          theme.palette.mode === "dark"
            ? "#fffff50"
            : `${theme.palette.primary.main}40`
        }`,
      borderRadius: 1,
      p: 1.5,
      width: "100%",
    }}
    spacing={1}
  >
    <Components.Global.StackLabel
      direction="row"
      title={`${coin.currency} Balance`}
      label={
        <Components.Global.Format
          number={amountBalance}
          type="coin"
          coin={coin.currency}
        />
      }
      medium
      node
    />
    <Components.Global.StackLabel
      direction="row"
      title={`${coin.coin} Balance`}
      label={
        <Components.Global.Format
          number={coinBalance}
          type="coin"
          coin={coin.coin}
        />
      }
      medium
      node
    />
  </Mui.Stack>
);
