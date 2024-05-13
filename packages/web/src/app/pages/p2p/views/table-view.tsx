import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const TableView = ({ p2pCoins }: { p2pCoins: string[] }) => {
  const { pathname } = Router.useLocation();
  const { userId, coin, type } = Router.useParams();

  return (
    <Components.Global.Container
      direction="column"
      spacing={2}
      sx={{ minHeight: { md: 700 } }}
    >
      <Mui.Typography variant="h6" fontWeight={800}>
        {userId ? "P2P Trades" : "P2P Trading"}
      </Mui.Typography>
      <Mui.ButtonGroup
        id="orderType"
        sx={{
          "& .MuiButtonGroup-grouped": {
            borderRadius: "4px !important",
            width: 80,
          },
        }}
      >
        <Mui.Button
          component={Router.Link}
          to={`${coin}/buy`}
          variant={pathname.includes("buy") ? "contained" : "text"}
          color={pathname.includes("buy") ? "success" : "secondary"}
        >
          Buy
        </Mui.Button>
        <Mui.Button
          component={Router.Link}
          to={`${coin}/sell`}
          variant={pathname.includes("sell") ? "contained" : "text"}
          color={pathname.includes("sell") ? "error" : "secondary"}
        >
          Sell
        </Mui.Button>
      </Mui.ButtonGroup>
      <Mui.Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        width="inherit"
      >
        <Mui.Stack
          direction="row"
          spacing={2}
          alignItems="center"
          width="inherit"
        >
          <Mui.Tabs
            id="assetNavigation"
            variant="scrollable"
            allowScrollButtonsMobile
            value={coin}
            TabIndicatorProps={{
              children: <span className="MuiTabs-indicatorSpan" />,
            }}
            sx={{
              color: "info.main",
              width: "fit-content",
              borderBottom: (theme) => `1px solid ${theme.palette.grey[100]}`,
              "& button": {
                minWidth: 50,
              },
              "& .MuiTabs-indicator": {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
              },
              "& .MuiTabs-indicatorSpan": {
                maxWidth: 50,
                width: "100%",
                backgroundColor: "info.main",
                borderRadius: 2,
              },
            }}
          >
            {p2pCoins.map((coin) => (
              <Mui.Tab
                label={coin}
                value={coin}
                component={Router.Link}
                to={`${coin}/${type}`}
                sx={{
                  fontSize: 16,
                  "&.Mui-selected": {
                    color: "info.main",
                  },
                }}
              />
            ))}
          </Mui.Tabs>
        </Mui.Stack>
      </Mui.Stack>
      <Router.Outlet />
      <Mui.Box flexGrow={1} />
    </Components.Global.Container>
  );
};
