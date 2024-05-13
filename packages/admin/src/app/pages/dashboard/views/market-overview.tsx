import * as Mui from "@mui/material";
import React from "react";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const MarketOverview = ({
  coins,
}: {
  coins: Hooks.Main.UseCoin.coin[];
}) => {
  const [coin, setCoin] = React.useState<Hooks.Main.UseCoin.coin>();
  const filteredCoins = coins
    ? coins?.filter(({ active }) => Boolean(active))
    : [];

  const handleChange = (e: Mui.SelectChangeEvent) =>
    setCoin(
      filteredCoins?.find(
        ({ coinId }) => coinId === e.target.value
      ) as Hooks.Main.UseCoin.coin
    );

  React.useEffect(() => {
    setCoin(filteredCoins?.[0] as Hooks.Main.UseCoin.coin);
  }, [filteredCoins?.length]);

  return (
    <Components.Global.Container direction="column" sx={{ height: "100%" }}>
      <Mui.Stack
        direction="row"
        spacing={2}
        mb={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Mui.Typography variant="h6">Market Overview </Mui.Typography>
        <Mui.Select
          size="small"
          defaultValue={filteredCoins?.[0]?.coinId}
          name="coin"
          onChange={handleChange}
          fullWidth
          sx={{ maxWidth: 200 }}
        >
          {filteredCoins?.map((coin, index) => (
            <Mui.MenuItem key={index} value={coin.coinId}>
              <Mui.Stack direction="row" alignItems="center" spacing={1}>
                <Mui.Avatar
                  src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                    import.meta.env.VITE_API_IP
                  }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
                  sx={{ height: 30, width: 30 }}
                />
                <Mui.Typography variant="body2">{coin.coinId}</Mui.Typography>
              </Mui.Stack>
            </Mui.MenuItem>
          ))}
        </Mui.Select>
      </Mui.Stack>
      <Pages.Dashboard.Views.ChartView coin={coin as Hooks.Main.UseCoin.coin} />
    </Components.Global.Container>
  );
};
