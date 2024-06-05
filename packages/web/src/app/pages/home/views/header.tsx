import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";
import * as ReactNext from "react-i18next";

export const Header = ({ user }: { user: Contexts.userContext.User }) => {

  const {t} = ReactNext.useTranslation();

  return (
    <>
    <Mui.CardMedia
      component="img"
      src={Assets.Banner}
      sx={{ zIndex: "0", position: "absolute", height: "100%" }}
    />
    <Mui.Stack
      sx={{
        position: "absolute",
        top: "20%",
        left: { xs: "2%", sm: "5%" },
        width: { xs: "100%", md: "40%" },
        height: "80%",
        padding: "8% 0%",
      }}
    >
      <Mui.Typography
        sx={{
          color: "#fff",
          fontWeight: 900,
          // textShadow: (theme) =>
          //   `2.5px 2.5px ${theme.palette.primary.dark}, 3px 3px #fff`,
        }}
        variant="h4"
      >
        Welcome to the Global Trade Center for the World's Foremost Valuables
      </Mui.Typography>
      <Mui.Typography
        variant="h6"
        sx={{
          color: "#fff",
          py: 3,
          mr: 2,
        }}
      >
        Join millions of people around the world in exchanging different types
        of digital assets in a Quick, Safe, and Convenient environment.
      </Mui.Typography>
      <Mui.Stack direction="row" spacing={2}>
        <Mui.Button
          id={Boolean(user?.email) ? "wallet" : "register"}
          size="large"
          variant="contained"
          sx={{ width: 130, fontWeight: "bold" }}
          component={Router.Link}
          to={
            Boolean(user?.email)
              ? `${Constants.API_CONFIG.base}wallet`
              : `${Constants.API_CONFIG.base}account/register`
          }
        >
          {Boolean(user?.email) ? `${t('deposit')}` : `${t('getStarted')}`}
        </Mui.Button>
        <Mui.Button
          id={Boolean(user?.email) ? "spot" : "contact"}
          variant="outlined"
          component={Router.Link}
          to={
            Boolean(user?.email)
              ? `${Constants.API_CONFIG.base}spot`
              : `${Constants.API_CONFIG.base}contact`
          }
          sx={{
            color: "#fff",
            width: 130,
            border: `1px solid #fff`,
            // display: Boolean(user?.email) ? "none" : "none",
          }}
        >
          {Boolean(user?.email) ? `${t('buy')}` : `${t("contact")}`}
        </Mui.Button>
      </Mui.Stack>
      <Pages.Home.Views.CoinFloat
        src={Assets.CardanoSvg}
        sx={{
          top: "-10%",
          right: "30%",
          animationDelay: "1.5s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.SolanaSvg}
        sx={{
          bottom: "0",
          right: "5%",
          animationDelay: "2.5s",
        }}
      />
    </Mui.Stack>
    <Mui.Stack
      sx={{
        position: "absolute",
        top: "10%",
        right: "1%",
        width: "60%",
        height: "80%",
        display: { xs: "none", md: "block" },
      }}
    >
      <Pages.Home.Views.CoinFloat
        src={Assets.EthereumSvg}
        sx={{
          top: "1%",
          left: "25%",
          animationDelay: "1s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.DollarSvg}
        sx={{
          bottom: "15%",
          left: "35%",
          animationDelay: "1.5s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.BitcoinSvg}
        sx={{
          top: "10%",
          right: "30%",
          animationDelay: "0.5s",
        }}
      />
      <Pages.Home.Views.CoinFloat
        src={Assets.YuanSvg}
        sx={{
          top: "50%",
          right: "10%",
          animationDelay: "2s",
        }}
      />
    </Mui.Stack>
  </>
  )
}