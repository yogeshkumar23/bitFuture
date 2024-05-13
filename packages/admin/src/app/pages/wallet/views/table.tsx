import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const TableCard = () => {
  const navigate = Router.useNavigate();
  const { coins, loading } = Hooks.Main.useCoin();
  const handleDeposit = (coin: Hooks.Main.UseCoin.coin) =>
    navigate("deposit", { state: coin });
  const handleWithdraw = (coin: Hooks.Main.UseCoin.coin) =>
    navigate("withdraw", { state: coin });

  const data = coins?.coinList?.length
    ? [...new Map(coins.coinList.map((item) => [item["coin"], item])).values()]
        .filter(({ active }) => Boolean(active))
        .map((coin, index) => ({
          coin: (
            <Mui.Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Mui.CardMedia
                component="img"
                src={`${import.meta.env.VITE_API_ENCRYPTION}://${
                  import.meta.env.VITE_API_IP
                }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
                sx={{ width: 40, borderRadius: 20 }}
              />
              <Mui.Stack>
                <Mui.Typography variant="body2" noWrap fontWeight="bolder">
                  {coin.coinName}
                </Mui.Typography>
                <Mui.Typography variant="body2" color="text.secondary">
                  {coin.coin}
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Stack>
          ),
          amount: (
            <Pages.Wallet.Views.Balance
              coin={coin.coin}
              price={coin.current_price}
            />
          ),
          action: (
            <Mui.Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Mui.Link
                sx={{ color: "success.main" }}
                component={Mui.Button}
                onClick={() => handleDeposit(coin)}
              >
                Deposit
              </Mui.Link>
              <Mui.Link
                sx={{ color: "warning.main" }}
                component={Mui.Button}
                onClick={() => handleWithdraw(coin)}
              >
                Withdraw
              </Mui.Link>
            </Mui.Stack>
          ),
        }))
    : [];

  return (
    <Components.Global.Container direction="column" spacing={2}>
      <Mui.Typography variant="h6">My Assets</Mui.Typography>
      {loading ? (
        <Components.Global.GlobalLoader />
      ) : (
        <Components.Global.ResponsiveTable
          id="Admin Assets"
          titles={["COIN", "AMOUNT", "ACTION"]}
          data={data}
        />
      )}
      <Mui.Box flexGrow={1} />
    </Components.Global.Container>
  );
};
