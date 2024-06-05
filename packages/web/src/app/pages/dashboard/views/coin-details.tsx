import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import { useTranslation } from "react-i18next";

export const CoinDetails = ({
  coinWalletDetails,
  nativeCurrency,
  mainCurrency,
  nativePrice,
}: {
  coinWalletDetails: Hooks.User.coinsWallet[];
  nativeCurrency: string;
  mainCurrency: string;
  nativePrice: number;
}) => {
  const data = coinWalletDetails
    ? coinWalletDetails
        .filter(
          ({ type, coin, currency }) =>
            (type === "COIN" && currency === mainCurrency) ||
            coin === mainCurrency
        )
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.typeId === value.typeId)
        ).length %
        2 ===
      0
      ? coinWalletDetails
          .filter(
            ({ type, coin, currency }) =>
              (type === "COIN" && currency === mainCurrency) ||
              coin === mainCurrency
          )
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.typeId === value.typeId)
          )
      : [
          ...coinWalletDetails
            .filter(
              ({ type, coin, currency }) =>
                (type === "COIN" && currency === mainCurrency) ||
                coin === mainCurrency
            )
            .filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.typeId === value.typeId)
            ),
          {} as Hooks.User.coinsWallet,
        ]
    : [];

    const {t} = useTranslation();


  return (
    <Components.Global.Container
      direction="column"
      justifyContent="start"
      spacing={2}
      sx={{ height: "100%" }}
      id="coinDetails"
    >
      <Mui.Stack
        direction={{ xs: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        spacing={1}
      >
        <Mui.Typography variant="h5" fontWeight={900}>
        {t('dashboard')}
        </Mui.Typography>
        {/* <Mui.Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          <Mui.Link
            component={Router.Link}
            to={`${Constants.API_CONFIG.base}wallet`}
          >
            Transfer
          </Mui.Link>
          <Mui.Link
            sx={{ color: "success.main" }}
            component={Router.Link}
            to={`${Constants.API_CONFIG.base}wallet`}
          >
            Deposit
          </Mui.Link>
          <Mui.Link
            sx={{ color: "warning.main" }}
            component={Router.Link}
            to={`${Constants.API_CONFIG.base}wallet`}
          >
            Withdraw
          </Mui.Link>
        </Mui.Stack> */}
      </Mui.Stack>

      <Mui.Stack sx={{ width: "100%", overflow: "auto" }}>
        <Mui.Grid
          container
          spacing={2}
          sx={{
            pb: 2,
            width: `${220 * (data.length / 2)}px ! important}`,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.grey[100]}`,
            overflow: "auto",
          }}
        >
          {data
            .filter((_, index) => index % 2 === 0)
            .map((value, index) => (
              <Mui.Grid item xs>
                <Pages.Dashboard.Views.Coins
                  key={index}
                  coin={value.coinLogo}
                  coinName={value.coin}
                  balance={value.balance - Math.abs(value.freeze)}
                  amountType={nativeCurrency}
                  amount={value.current_price * nativePrice}
                />
              </Mui.Grid>
            ))}
          {data
            .filter((_, index) => index % 2 === 1)
            .map((value, index) => (
              <Mui.Grid item xs>
                {value.coin && (
                  <Pages.Dashboard.Views.Coins
                    key={index}
                    coin={value.coinLogo}
                    coinName={value.coin}
                    balance={value.balance - Math.abs(value.freeze)}
                    amountType={nativeCurrency}
                    amount={value.current_price * nativePrice}
                  />
                )}
              </Mui.Grid>
            ))}
        </Mui.Grid>
      </Mui.Stack>
    </Components.Global.Container>
  );
};
