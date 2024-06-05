import * as Mui from "@mui/material";
import React from "react";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";


export const Footer = () => {
  const [index, setIndex] = React.useState(true);
  const {t} = useTranslation();

  return (
    <Components.Global.Container
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        py: 5,
        mb: -2,
        bgcolor: "background.default",
        px: { xs: 0, sm: 1 },
      }}
    >
      <Mui.Typography align="center" variant="h5" fontWeight={900}>
      {t('howp2pwork')}
      </Mui.Typography>

      <Mui.ButtonGroup
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Mui.Button
          variant="text"
          onClick={() => setIndex(true)}
          sx={{
            color: index ? "text.primary" : "text.secondary",
            position: "relative",
            height: 45,
            px: 5,
          }}
        >
          {t('buyAssets')}
          {index && (
            <Mui.Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: 50,
                borderRadius: 2,
                borderBottom: (theme) =>
                  `3px solid ${theme.palette.primary.light}`,
              }}
            />
          )}
        </Mui.Button>
        <Mui.Button
          variant="text"
          onClick={() => setIndex(false)}
          sx={{
            color: !index ? "text.primary" : "text.secondary",
            position: "relative",
            height: 45,
            px: 5,
          }}
        >
          {t('sellAssets')}
          {!index && (
            <Mui.Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: 50,
                borderRadius: 2,
                borderBottom: (theme) =>
                  `3px solid ${theme.palette.primary.light}`,
              }}
            />
          )}
        </Mui.Button>
      </Mui.ButtonGroup>
      <Mui.Stack
        spacing={2}
        justifyContent="space-around"
        sx={{
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-end" },
        }}
      >
        <Components.Global.InfoCard
          imageBackground
          image={index ? Assets.PlaceAnOrder : Assets.Strategy}
          title={index ? `${t('PlaceAnOrder')}` : "Post an Order"}
          content={
            index
              ? `${t('afterChoosingTheAssets')}`
              : `After choosing the asset that you want to sell; post your "sell order" based on your sale parameters and trade terms or pick from the list of buyers within the region you wish to trade in and initiate trade.`
          }
        />
        <Components.Global.InfoCard
          imageBackground
          image={index ? Assets.PayTheSeller : Assets.Decide}
          title={index ? `${t('payTheSeller')}` : "Receive Payment"}
          content={
            index
              ? `${t('makeYourPaymentThrough')}`
              : `Wait to Receive payment in the right external account or right payment channel that you have specified within the time frame that you have given.`
          }
        />
        <Components.Global.InfoCard
          imageBackground
          image={index ? Assets.GetCrypto : Assets.Fill}
          title={index ? `${t('getYourAssets')}` : "Get your Cash"}
          content={
            index
              ? `${t('oncePaymentHasBeenConfirm')}`
              : `Once payment has been confirmed in your external account, initiate "release" so that asset's ownership would be rightfully transfered to the Buyer.`
          }
        />
      </Mui.Stack>
    </Components.Global.Container>
  );
};
