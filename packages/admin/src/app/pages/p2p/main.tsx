import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Main = () => {
  const navigate = Router.useNavigate();
  const [filter, setFilter] = React.useState("");
  const { p2pcoinpair, loading } = Hooks.Main.useP2PCoinList();
  const filteredCoins = p2pcoinpair?.coinList
    ? p2pcoinpair.coinList?.filter((coins) =>
        `${coins.coin} ${coins.currency_id}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const data = filteredCoins?.map((coin, index) => ({
    coin: (
      <Mui.Stack key={index} direction="row" alignItems="center" spacing={1}>
        <Mui.CardMedia
          component="img"
          src={`${import.meta.env.VITE_API_ENCRYPTION}://${
            import.meta.env.VITE_API_IP
          }${import.meta.env.VITE_ASSETS_PATH}${coin.coinLogo}`}
          sx={{ width: 40, borderRadius: 20 }}
        />
        <Mui.Stack>
          <Mui.Typography variant="body2" noWrap fontWeight="bolder">
            {coin.coinName}
          </Mui.Typography>
          <Mui.Typography variant="body2" color="text.secondary">
            {coin.coin}
          </Mui.Typography>
        </Mui.Stack>
      </Mui.Stack>
    ),
    QuoteCurrency: `${coin.currency_id}`,
    TransactionFee: (
      <Components.Global.Format
        number={coin.p2p_transactionFee}
        type="percentage"
      />
    ),
    MarkPrice: (
      <Components.Global.Format
        number={coin.p2p_markPrice}
        type="coin"
        coin={coin.currency_id}
      />
    ),
    Status: (
      <Mui.Typography
        variant="inherit"
        color={Boolean(coin.p2p_active) ? "success.main" : "error.main"}
      >
        {Boolean(coin.p2p_active) ? "Active" : "Deactive"}
      </Mui.Typography>
    ),
    Action: (
      <Mui.Button
        size="small"
        variant="contained"
        onClick={() => navigate("edit", { state: coin })}
      >
        Edit
      </Mui.Button>
    ),
  }));

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Stack
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Mui.Typography variant="h5">P2P Trade Pairs</Mui.Typography>
        <Mui.Button
          startIcon={<MuiIcons.Add />}
          variant="contained"
          component={Router.Link}
          to="add"
        >
          Add Coin pairs
        </Mui.Button>
      </Mui.Stack>
      <Components.Global.Container spacing={2} direction="column">
        <Mui.Stack
          direction={{ sm: "column", md: "row" }}
          justifyContent="flex-end"
          spacing={2}
        >
          <Mui.TextField
            variant="outlined"
            size="small"
            placeholder="Filter records..."
            onChange={handleChange}
            value={filter}
          />
        </Mui.Stack>
        <Components.Global.ResponsiveTable
          id="P2P Coin Pairs"
          titles={[
            "Base Currency",
            "Quote Currency",
            "Transaction Fee",
            "Mark Price",
            "Status",
            "Action",
          ]}
          data={data}
        />
      </Components.Global.Container>
      <Router.Outlet />
    </Mui.Stack>
  );
};
