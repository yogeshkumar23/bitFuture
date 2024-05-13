import * as Mui from "@mui/material";
import * as Assets from "src/assets";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";

export const NavigateLogo = ({
  image,
  sx,
  video = false,
}: { image: string } & Pick<Mui.CardMediaProps, "sx"> & {
    video?: boolean;
  }) => (
  <Mui.CardActionArea
    disableRipple
    component={Router.Link}
    to={`${Constants.API_CONFIG.base}`}
    sx={{ zIndex: 2, width: "fit-content", p: 1, borderRadius: 1 }}
  >
    <Mui.CardMedia
      component={video ? "video" : "img"}
      autoPlay
      loop
      src={image}
      sx={{ height: 55, width: 120, ...sx }}
    />
  </Mui.CardActionArea>
);

export const Center = () => (
  <NavigateLogo image={Assets.Logo} sx={{ width: 90 }} />
);

export const MainCenterLogo = (props: Pick<Mui.CardMediaProps, "sx">) => {
  const theme = Mui.useTheme();
  return (
    <NavigateLogo
      image={
        theme.palette.mode === "dark" ? Assets.WhiteLogo : Assets.MainCenterLogo
      }
      {...props}
    />
  );
};

export const MainCenterLogoWHITE = () => (
  <NavigateLogo image={Assets.LogoWhite} />
);
