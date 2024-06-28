import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import { useTranslation } from "react-i18next";


export const AmountBox = ({
  coinWalletDetails,
  amountWalletDetails,
  nativeCurrency,
  mainCurrency,
  nativePrice,
}: {
  coinWalletDetails: Hooks.User.coinsWallet[];
  amountWalletDetails: Hooks.User.UseCoinBalance.userWallet[];
  nativeCurrency: string;
  mainCurrency: string;
  nativePrice: number;
}) => {
  const navigate = Router.useNavigate();
  const data = amountWalletDetails?.find(
    ({ typeId }) => typeId === mainCurrency
  ) || {
    balance: 0,
    freeze: 0,
    typeId: mainCurrency,
  };
  const estimatedCoinsTotal = coinWalletDetails
    ?.filter(({ currency }) => currency === mainCurrency)
    ?.filter(({ type }) => type === "COIN")
    ?.map(
      (coin) =>
        coin.current_price *
        (coin.balance - Math.abs(coin.freeze)) *
        nativePrice
    )
    ?.reduce((a, b) => a + b, 0);

  const handleDeposit = () =>
    navigate(`${Constants.API_CONFIG.base}wallet/deposit`, {
      state: {
        ...data,
        coinId: coinWalletDetails.find(({ type }) => type === "COIN")?.coinId,
      },
    });

  const handleWithdraw = () =>
    navigate(`${Constants.API_CONFIG.base}wallet/withdraw`, {
      state: {
        ...data,
        coinId: coinWalletDetails.find(({ type }) => type === "COIN")?.coinId,
      },
    });

    const {t} = useTranslation();


  return (
    <Components.Global.Container
      direction="column"
      spacing={2}
      id="mainCurrency"
      sx={{ bgcolor: "primary.main", height: "100%" }}
    >
      <Mui.Box>
        <Mui.Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Mui.Typography variant="h6" noWrap sx={{ color: "#ffff" }}>
          {t('balanceDetails')}

          </Mui.Typography>
          {/* <Mui.Button
            id="mainCurrencyDeposit"
            variant="contained"
            size="small"
            color="success"
            onClick={handleDeposit}
          >
           {t('deposit')}

          </Mui.Button>
          <Mui.Button
            id="mainCurrencyWithdraw"
            disabled={data?.balance - Math.abs(data?.freeze) <= 0}
            variant="contained"
            size="small"
            color="warning"
            onClick={handleWithdraw}
          >
            {t('withdraw')}

          </Mui.Button> */}
        </Mui.Stack>

        <Mui.Divider sx={{ bgcolor: "#ffff", mt: 1, opacity: 0.8 }} />
      </Mui.Box>
      <Mui.Typography variant="body1" sx={{ color: "#ffff", opacity: 0.8 }}>
      {t('totalAvailableBalance')}

      </Mui.Typography>
      <Mui.Stack direction="row" justifyContent="space-between">
        <Mui.Typography variant="h5" sx={{ color: "#ffff" }}>
          <Components.Global.Format
            type="number"
            number={data.balance - Math.abs(data.freeze)}
            // coin={data?.typeId}
          />
        </Mui.Typography>
        <Mui.Typography variant="body1" sx={{ color: "#ffff", opacity: 0.8 }}>
          {data?.typeId}
        </Mui.Typography>
      </Mui.Stack>
      <Mui.Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: "primary.dark",
          p: "inherit",
          borderRadius: "inherit",
        }}
      >
        <Mui.Typography variant="body1" sx={{ color: "#ffff" }}>
        {t('totalAssetValue')}:

        </Mui.Typography>
        <Mui.Typography variant="body1" align="right" sx={{ color: "#ffff" }}>
          <Components.Global.Format
            type={nativeCurrency}
            number={
              estimatedCoinsTotal +
              (data.balance - Math.abs(data.freeze)) * nativePrice
            }
          />
        </Mui.Typography>
      </Mui.Stack>
    </Components.Global.Container>
  );
};
