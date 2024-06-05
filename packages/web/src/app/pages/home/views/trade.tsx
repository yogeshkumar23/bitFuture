import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import { useTranslation } from "react-i18next";

export const Trade = ({
  user,
}: {
  user: Contexts.userContext.User | undefined;
}) => {

  const {t} = useTranslation();
 return (
  <Mui.Stack
  sx={{
    position: "relative",
    backgroundImage: `url('${Assets.MarketTrands}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: { xs: "145vh", md: "65vh" },
    overflow: "hidden",
  }}
  component={Mui.Container}
  maxWidth="md"
>
  <Mui.Typography variant="h4" fontWeight={900}>
    Kick-start Trading In Three Simple Steps
  </Mui.Typography>
  <Mui.Stack
    justifyContent="space-around"
    direction={{ xs: "column", md: "row" }}
    alignItems={{ xs: "center", md: "flex-end" }}
    sx={{
      py: 3,
    }}
    spacing={3}
  >
    <Mui.Stack spacing={2} sx={{ alignSelf: "center" }}>
      <Mui.Typography variant="h5" fontWeight={200}>
        1. Register and get authorized access
      </Mui.Typography>
      <Mui.Typography variant="h5" fontWeight={200}>
        2. Fund and link account
      </Mui.Typography>
      <Mui.Typography variant="h5" fontWeight={200}>
        3. Trade digital assets
      </Mui.Typography>
    </Mui.Stack>
    <CardComponent
      image={Assets.Register}
      path={
        Boolean(user?.email)
          ? `${Constants.API_CONFIG.base}profile`
          : `${Constants.API_CONFIG.base}account/register`
      }
      button={Boolean(user?.email) ? `${t('goToProfile')}`: `${t('registerNow')}`}
    />
    <CardComponent
      image={Assets.Trade}
      path={
        Boolean(user?.email)
          ? `${Constants.API_CONFIG.base}spot`
          : `${Constants.API_CONFIG.base}account/register`
      }
      button={`${t('tradeNow')}`}
    />
  </Mui.Stack>
</Mui.Stack>
 )
};

const CardComponent = ({
  image,
  path,
  button,
}: {
  image: string;
  path: string;
  button: string;
}) => (
  <Mui.Stack alignItems="center">
    <Mui.Box
      component="span"
      sx={{
        bgcolor: (theme) => `${theme.palette.primary.main}20`,
        width: "15rem",
        height: "15rem",
        position: "relative",
        borderRadius: 50,
        mb: 3,
        "&:hover": {
          bgcolor: "primary.main",
        },
      }}
    >
      <Mui.CardMedia
        component="img"
        src={image}
        sx={{
          width: "8rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Mui.Box>
    <Mui.Typography>
      <Mui.Button
        variant="contained"
        size="large"
        component={Router.Link}
        to={path}
        id={button.replace(" ", "_").toLowerCase()}
        sx={{ fontWeight: "bold" }}
      >
        {button}
      </Mui.Button>
    </Mui.Typography>
  </Mui.Stack>
);
