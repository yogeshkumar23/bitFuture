import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
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
  const {t} = useTranslation();

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
        coinId: coinWalletDetails.find(
          ({ type, currency }) => type === "COIN" && currency === mainCurrency
        )?.coinId,
        type: "AMOUNT",
      },
    });

  const handleWithdraw = () =>
    navigate(`${Constants.API_CONFIG.base}wallet/withdraw`, {
      state: {
        ...data,
        coinId: coinWalletDetails.find(
          ({ type, currency }) => type === "COIN" && currency === mainCurrency
        )?.coinId,
        type: "AMOUNT",
      },
    });

  return (
    <Components.Global.Container
      id="mainCurrency"
      direction="column"
      spacing={2}
      sx={{ bgcolor: "primary.main", height: "100%", p: { xs: 3, sm: 5 } }}
    >
      <Mui.Typography
        variant="h6"
        noWrap
        sx={{ color: "#ffff", fontWeight: 900 }}
      >
        {t('balanceDetails')}
      </Mui.Typography>

      <Mui.Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        spacing={5}
      >
        <Mui.Stack
          direction="row"
          spacing={2}
          alignItems="center"
          id="totalBalance"
        >
          <Mui.IconButton
            size="large"
            disableRipple
            sx={{ bgcolor: "primary.light" }}
          >
            <MuiIcons.AccountBalanceWalletOutlined
              fontSize="inherit"
              sx={{ color: "#fff" }}
            />
          </Mui.IconButton>
          <Components.Global.StackLabel
            titleColor="#fff"
            title={`${t("totalAvailableBalance")}:`}
            label={
              <Mui.Typography variant="h5" sx={{ color: "#ffff" }}>
                <Components.Global.Format
                  type="coin"
                  number={(data.balance - Math.abs(data.freeze))}
                  coin={data?.typeId}
                />
              </Mui.Typography>
            }
            node
            medium
          />
        </Mui.Stack>
        <Mui.Stack
          direction="row"
          spacing={2}
          alignItems="center"
          id="estimatedValue"
        >
          <Mui.IconButton
            size="large"
            disableRipple
            sx={{ bgcolor: "primary.light" }}
          >
            <MuiIcons.MonetizationOnOutlined
              fontSize="inherit"
              sx={{ color: "#fff" }}
            />
          </Mui.IconButton>
          <Components.Global.StackLabel
            titleColor="#fff"
            title={`${t("totalAssetValue")}:`}
            label={
              <Mui.Typography variant="h5" sx={{ color: "#ffff" }}>
                <Components.Global.Format
                  type={nativeCurrency}
                  number={
                    estimatedCoinsTotal +
                    (data.balance - Math.abs(data.freeze)) * nativePrice
                  }
                />
              </Mui.Typography>
            }
            node
            medium
          />
        </Mui.Stack>
        <Mui.Box flexGrow={{ xs: 0, sm: 1 }} />
        <Mui.Stack spacing={2} direction="row">
          <Mui.Button
            id="mainCurrencyDeposit"
            variant="contained"
            color="success"
            // disableElevation
            onClick={handleDeposit}
            // sx={{
            //   bgcolor: "success.light",
            //   "&:hover": {
            //     bgcolor: "success.light",
            //   },
            // }}
          >
          {t('deposit')}
          </Mui.Button>
          <Mui.Button
            id="mainCurrencyWithdraw"
            disabled={data?.balance - Math.abs(data?.freeze) <= 0}
            variant="contained"
            color="warning"
            // disableElevation
            onClick={handleWithdraw}
            // sx={{
            //   bgcolor: "warning.light",
            //   "&:hover": {
            //     bgcolor: "warning.light",
            //   },
            // }}
          >
           {t('withdraw')}
          </Mui.Button>
        </Mui.Stack>
      </Mui.Stack>
    </Components.Global.Container>
  );
};
