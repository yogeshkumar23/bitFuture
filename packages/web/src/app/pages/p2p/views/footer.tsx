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
          title={index ? `${t('PlaceAnOrder')}` : `${t('postAnOrder')}`}
          content={
            index
              ? `${t('afterChoosingTheAssets')}`
              : `${t('afterChooseingTheAssetThatYouWantToSell')}`
          }
        />
        <Components.Global.InfoCard
          imageBackground
          image={index ? Assets.PayTheSeller : Assets.Decide}
          title={index ? `${t('payTheSeller')}` : `${t('receivePayment')}`}
          content={
            index
              ? `${t('makeYourPaymentThrough')}`
              : `${t('waitToReceivePayment')}`
          }
        />
        <Components.Global.InfoCard
          imageBackground
          image={index ? Assets.GetCrypto : Assets.Fill}
          title={index ? `${t('getYourAssets')}` : `${t('getYourCash')}`}
          content={
            index
              ? `${t('oncePaymentHasBeenConfirm')}`
              : `${t('oncePaymentHasBeenConfirmed')}`
          }
        />
      </Mui.Stack>
    </Components.Global.Container>
  );
};
