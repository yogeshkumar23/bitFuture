import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";

export const NFTNetwork = ({
  name,
  subname,
  image,
  onClick,
}: nftcard.Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Mui.Card
      component={Mui.Stack}
      alignItems="center"
      sx={{
        borderRadius: 5,
        width: "fit-content",
        height: "fit-content",
        p: 1.5,
        mx: "20px !important",
        "&:hover": {
          bgcolor: (theme) => `${theme.palette.primary.main}20`,
        },
        cursor: "pointer",
        border: (theme) =>
          open
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.grey[100]}`,
      }}
      spacing={2}
      onClick={() => {
        onClick?.();
        setOpen(!open);
      }}
    >
      <Mui.CardMedia
        component="img"
        image={image}
        alt=""
        sx={{
          width: 220,
          height: 220,
          borderRadius: "inherit",
          objectFit: "cover",
        }}
      />
      <Mui.Typography
        variant="body2"
        noWrap
        sx={{ fontWeight: 900, width: 200 }}
      >
        {name}
      </Mui.Typography>
      <Mui.Typography
        variant="caption"
        noWrap
        sx={{ fontWeight: 500, width: 200, mt: 1 }}
      >
        {subname}
      </Mui.Typography>
    </Mui.Card>
  );
};

export const NFTCard = ({
  id,
  account,
  image,
  name,
  subname,
  value,
  price,
  onClick,
  form,
}: nftcard.Props) => {
  const [hover, setHover] = React.useState(false);
  const { pathname } = Router.useLocation();
  return (
    <Mui.Card
      id="nftToken"
      onClick={onClick}
      onMouseEnter={() => pathname !== "/" && setHover(true)}
      onMouseLeave={() => pathname !== "/" && setHover(false)}
      sx={{
        position: "relative",
        m: "auto",
        cursor: "pointer",
        borderRadius: 5,
        border: (theme) =>
          theme.palette.mode === "dark"
            ? undefined
            : `1px solid ${theme.palette.grey[300]}`,
        width: "fit-content",
        height: "fit-content",
        // p: 1.5,
        "&:hover": {
          bgcolor: (theme) => `${theme.palette.primary.main}20`,
        },
      }}
    >
      {form}
      <Mui.CardMedia
        component="img"
        image={image}
        alt="Image Not Set"
        sx={{
          position: "relative",
          width: { xs: 270, sm: 300 },
          height: { xs: 270, sm: 300 },
          borderRadius: "inherit",
          objectFit: "cover",
          bgcolor: (theme) => `${theme.palette.info.main}40`,
          "&:before": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "text.secondary",
            fontSize: 18,
            fontWeight: 700,
          },
        }}
      />
      <Mui.CardContent component={Mui.Stack} spacing={0.5}>
        <Mui.Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 900, width: { xs: 230, sm: 260 } }}
        >
          {name}
        </Mui.Typography>
        <Mui.Typography
          variant="body2"
          noWrap
          sx={{ fontWeight: 500, width: { xs: 230, sm: 260 }, mt: 1 }}
        >
          {subname}
        </Mui.Typography>
      </Mui.CardContent>
      <Mui.Box sx={{ width: { xs: 270, sm: 300 } }}>
        <Mui.Collapse in={form ? true : !hover}>
          <Mui.Stack
            direction="row"
            alignItems="flex-end"
            sx={{ maxHeight: 30, p: 2.8 }}
          >
            <Mui.Typography
              variant="body2"
              noWrap
              sx={{ fontWeight: 800, mt: price ? 1 : 10 }}
              flexGrow={1}
            >
              Token # {id}
            </Mui.Typography>
            {price ? (
              <Mui.Typography variant="body2" noWrap color="primary.main">
                {value}
              </Mui.Typography>
            ) : null}
          </Mui.Stack>
        </Mui.Collapse>
        <Mui.Collapse in={form ? false : hover}>
          <Mui.Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              borderRadius: 0,
              fontWeight: 800,
              display: hover ? "flex" : "none",
            }}
          >
            {account ? "View" : "Connect Wallet"}
          </Mui.Button>
        </Mui.Collapse>
      </Mui.Box>
    </Mui.Card>
  );
};

export declare namespace nftcard {
  export interface Props {
    id: string;
    name: string;
    subname?: string;
    value?: React.ReactNode;
    image: string;
    account?: string;
    price?: boolean;
    onClick?: () => void;
    form?: React.ReactNode;
  }
}
