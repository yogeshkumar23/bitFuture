import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import React from "react";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import { useTranslation } from "react-i18next";


export const Table = ({
  p2pCurrency,
  coinWalletDetails,
}: {
  p2pCurrency: string[];
  coinWalletDetails: Hooks.User.coinsWallet[];
}) => {
  const {t} = useTranslation();

  const [expiry, setExpiry] = React.useState(0);
  const [filter, setFilter] = React.useState({
    amount: "" as unknown as number,
    amountType: "0",
    paymentType: "all",
  });
  const { userId, coin, type } = Router.useParams();
  const { pathname } = Router.useLocation();
  const { user } = React.useContext(Contexts.UserContext);
  const query = [
    FirebaseFirestore.where("coin", "==", coin),
    FirebaseFirestore.where("orderType", "==", type === "buy" ? "sell" : "buy"),
    FirebaseFirestore.where("showPostTill", ">=", new Date().getTime()),
    FirebaseFirestore.where("status", "in", ["pending", "partiallyPending"]),
    FirebaseFirestore.orderBy("showPostTill", "desc"),
  ];
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    `p2p_trade_book`,
    [coin as string, type as string, expiry.toString()]
  ).collectionSnapshot(
    userId ? [FirebaseFirestore.where("uid", "==", userId), ...query] : query
  );

  const { data: reviews } = Hooks.Firebase.useFireSnapshot<p2p_review>(
    "collectionGroup",
    `reviews`
  ).collectionSnapshot();

  React.useEffect(() => {
    const id = setInterval(() => {
      setExpiry(
        trades
          ?.map(({ showPostTill }) => showPostTill > new Date().getTime())
          ?.filter(Boolean)?.length || 0
      );
    }, 1000);
    return () => clearInterval(id);
  }, [coin as string, type as string, trades?.length || ""]);

  const data = trades
    ? trades
        .filter(({ uid }) => uid !== user?.uid)
        .filter(({ pricePerCoin, prefferedPayment, currency }) =>
          filter.amountType === "0" && filter.paymentType === "all"
            ? true
            : prefferedPayment === filter.paymentType &&
              filter.amountType === currency &&
              (filter.amount ? pricePerCoin === +filter.amount : true)
        )
        .map((trade) => {
          const currentUserRatings = reviews
            ? reviews.filter(({ uid }) => trade.uid === uid)
            : [];
          const userRating = currentUserRatings?.length
            ? currentUserRatings
                ?.map(({ rating }) => rating)
                ?.reduce((a, b) => a + b, 0) / currentUserRatings?.length
            : 0;

          return {
            available: (
              <Components.Global.Format
                number={trade.noOfCoins - (trade?.tradedCoins || 0)}
                type="coin"
                coin={coin}
              />
            ),
            advertiser: pathname.includes("info") ? (
              trade?.userName
            ) : (
              <Mui.Link
                component={Router.Link}
                to={`${Constants.API_CONFIG.base}p2p/${trade.uid}/info/BTC/buy`}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {trade?.userName} ({userRating}{" "}
                <MuiIcons.Star fontSize="small" />)
              </Mui.Link>
            ),
            price: (
              <Components.Global.Format
                number={trade.pricePerCoin}
                type="coin"
                coin={trade.currency}
              />
            ),
            limit: `${trade.quantityLimitFrom} - ${trade.quantityLimitTo}`,
            payment:
              +trade.prefferedPayment === 0
                ? "All Payments"
                : trade.prefferedPayment,
            action: (
              <Mui.Button
                variant="contained"
                color={type === "buy" ? "primary" : "error"}
              >
                <Mui.Typography variant="body2">
                  {type?.toUpperCase()} {coin}
                </Mui.Typography>
              </Mui.Button>
            ),
            node: (
              <Pages.P2P.Views.CollapseData
                coinWalletDetails={coinWalletDetails}
                {...trade}
              />
            ),
          };
        })
    : [];

  return (
    <>
      <Pages.P2P.Views.SearchBox
        setFilter={setFilter}
        p2pCurrency={p2pCurrency}
      />
      <Components.Global.ResponsiveTable
        titles={[
          `${t('item')}`.toUpperCase(),
          `${t('advertiser')}`.toUpperCase(),
          `${t('priceItems')}`.toUpperCase(),
          `${t('tradeLimit')}`.toUpperCase(),
          `${t('payment')}`.toUpperCase(),
          `${t('trade')}`.toUpperCase(),
        ]}
        data={data}
      />
      <Router.Outlet />
    </>
  );
};
