import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Assets from "src/assets";
import * as Constants from "src/constants";

export const GlobalLoader = ({ sx, ...props }: Mui.StackProps) => {
  const { pathname } = Router.useLocation();
  return (
    <Mui.Stack
      alignItems="center"
      justifyContent="center"
      {...props}
      sx={{
        position: "fixed",
        background: (theme) => theme.palette.background.default,
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        p: 5,
        zIndex: (theme) =>
          pathname === Constants.API_CONFIG.base
            ? theme.zIndex.appBar + 1
            : theme.zIndex.appBar - 1,
        ...sx,
      }}
    >
      <img
        className="preloader-image"
        width="190px"
        src={Assets.LogoGif}
        alt="preloader"
      />
    </Mui.Stack>
  );
};
