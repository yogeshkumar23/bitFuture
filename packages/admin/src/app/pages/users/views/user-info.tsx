import * as DateFns from "date-fns";
import * as FirebaseFirestore from "firebase/firestore";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import TimeAgo from "react-timeago";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const UserInfo = () => {
  const navigate = Router.useNavigate();
  const { userId } = Router.useParams();
  const { p2pcoinpair } = Hooks.Main.useP2PCoinList();
  const p2pCoins = p2pcoinpair?.coinList
    ? [
        ...new Set(
          p2pcoinpair.coinList
            .filter(({ p2p_active }) => Boolean(p2p_active))
            .map(({ coin }) => coin)
        ),
      ]
    : [];
  const { data: user } =
    Hooks.Firebase.useFireSnapshot<Hooks.User.UseUser.User>(
      "collection",
      "users"
    ).documentSnapshot(userId || "");
  const { data: reviews } = Hooks.Firebase.useFireSnapshot<{
    comment: string;
    rating: number;
    username: string;
    profile: string;
    time: string;
  }>("collection", `users/${userId}/reviews`).collectionSnapshot();
  const { data: trades } = Hooks.Firebase.useFireSnapshot<p2pTrade>(
    "collection",
    `p2p_trade_book`,
    [userId || ""]
  ).collectionSnapshot([FirebaseFirestore.where("uid", "==", userId)]);
  const { data: tradeRequest } =
    Hooks.Firebase.useFireSnapshot<p2pTradeRequest>(
      "collectionGroup",
      `p2p_request_trades`
    ).collectionSnapshot([
      FirebaseFirestore.orderBy("requestPlacedTime", "asc"),
    ]);

  const userRating = React.useMemo(
    () =>
      reviews?.length
        ? reviews?.map(({ rating }) => rating)?.reduce((a, b) => a + b, 0) /
          reviews?.length
        : 0,
    [reviews?.map(({ rating }) => rating)?.reduce((a, b) => a + b, 0)]
  );

  const handleBack = () => navigate(-1);

  return Boolean(trades && tradeRequest) ? (
    <Mui.Stack component={Mui.Container} spacing={2} sx={{ px: 0 }}>
      <Components.Global.Container
        direction="column"
        spacing={2}
        customTitle={
          <Mui.Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Mui.Typography variant="h6" fontWeight={600}>
              {user?.[0]?.firstName} {user?.[0]?.lastName}
            </Mui.Typography>
            <Mui.Button onClick={handleBack} startIcon={<MuiIcons.ArrowBack />}>
              Back
            </Mui.Button>
          </Mui.Stack>
        }
      >
        <Mui.Grid container spacing={2}>
          <Mui.Grid item xs={12} sm={4}>
            <Mui.Stack spacing={2}>
              <Mui.Avatar
                sx={{ height: 100, width: 100 }}
                src={
                  user?.[0]?.profileImage
                    ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                        import.meta.env.VITE_API_IP
                      }${import.meta.env.VITE_ASSETS_PATH}${user?.[0]?.profileImage}`
                    : `https://avatars.dicebear.com/api/initials/${user?.[0]?.firstName}_${user?.[0]?.lastName}.svg`
                }
              />
            </Mui.Stack>
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={4}>
            <Components.Global.StackLabel
              medium
              title="User Ratings"
              label={
                <Mui.Stack direction="row" spacing={0}>
                  {new Array(5).fill(undefined).map((_val, index) => (
                    <Mui.IconButton
                      disableRipple
                      size="small"
                      key={index}
                      color={userRating > index ? "primary" : undefined}
                    >
                      {userRating > index ? (
                        <MuiIcons.Star />
                      ) : (
                        <MuiIcons.StarBorder />
                      )}
                    </Mui.IconButton>
                  ))}
                </Mui.Stack>
              }
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={4}></Mui.Grid>
          <Mui.Grid item xs={6} sm={3}>
            <Components.Global.StackLabel
              medium
              title="Total Trades"
              label={`${
                trades?.filter(({ status }) => status === "completed")?.length
              }/${trades?.length}`}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={3}>
            <Components.Global.StackLabel
              medium
              title="Sell Orders"
              label={`${
                trades?.filter(
                  ({ orderType, status }) =>
                    orderType === "sell" && status === "completed"
                )?.length
              }/${
                trades?.filter(({ orderType }) => orderType === "sell")?.length
              }`}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={3}>
            <Components.Global.StackLabel
              medium
              title="Buy Orders"
              label={`${
                trades?.filter(
                  ({ orderType, status }) =>
                    orderType === "buy" && status === "completed"
                )?.length
              }/${
                trades?.filter(({ orderType }) => orderType === "buy")?.length
              }`}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={3}>
            <Components.Global.StackLabel
              medium
              title="User Requests"
              label={`${
                tradeRequest?.filter(
                  ({ requestuid, requestStatus }) =>
                    requestuid === userId && requestStatus === "completed"
                )?.length
              }/${
                tradeRequest?.filter(({ requestuid }) => requestuid === userId)
                  ?.length
              }`}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={3}>
            <Components.Global.StackLabel
              medium
              title="Received Requests"
              label={`${
                tradeRequest?.filter(
                  ({ tradeuid, requestStatus }) =>
                    tradeuid === userId && requestStatus === "completed"
                )?.length
              }/${
                tradeRequest?.filter(({ tradeuid }) => tradeuid === userId)
                  ?.length
              }`}
              node
            />
          </Mui.Grid>
          <Mui.Grid item xs={6} sm={3}>
            <Components.Global.StackLabel
              medium
              title="Joined"
              label={
                <TimeAgo
                  date={DateFns.fromUnixTime(
                    user?.[0]?.createdTime?.seconds || 0
                  )}
                />
              }
              node
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Divider />
        <Mui.Typography variant="h6">Asset Transactions</Mui.Typography>
        <Mui.Box sx={{ pl: 2 }}>
          <Mui.Grid
            container
            spacing={2}
            sx={{
              p: 2,
              bgcolor: (theme) => `${theme.palette.success.light}20`,
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.success.main}50`,
            }}
          >
            {p2pCoins.map((coin) => (
              <Mui.Grid item xs={6} sm={3}>
                <Components.Global.StackLabel
                  medium
                  title={`${coin} Sell`}
                  label={
                    <Components.Global.Format
                      number={trades
                        ?.filter(
                          (trade) =>
                            trade.orderType === "sell" &&
                            trade.coin === coin &&
                            trade.status === "completed"
                        )
                        ?.map(({ noOfCoins }) => noOfCoins)
                        ?.reduce((a, b) => a + b, 0)}
                      type="coin"
                      coin={coin}
                    />
                  }
                  node
                />
              </Mui.Grid>
            ))}
            {p2pCoins.map((coin) => (
              <Mui.Grid item xs={6} sm={3}>
                <Components.Global.StackLabel
                  medium
                  title={`${coin} Buy`}
                  label={
                    <Components.Global.Format
                      number={trades
                        ?.filter(
                          (trade) =>
                            trade.orderType === "buy" &&
                            trade.coin === coin &&
                            trade.status === "completed"
                        )
                        ?.map(({ noOfCoins }) => noOfCoins)
                        ?.reduce((a, b) => a + b, 0)}
                      type="coin"
                      coin={coin}
                    />
                  }
                  node
                />
              </Mui.Grid>
            ))}
          </Mui.Grid>
        </Mui.Box>
      </Components.Global.Container>
      <Components.Global.Container
        spacing={2}
        customTitle={
          <Mui.Typography variant="h6" fontWeight={800}>
            Reviews ({reviews?.length})
          </Mui.Typography>
        }
      >
        {reviews?.length ? (
          reviews?.map((reviewer) => (
            <Mui.Stack
              spacing={1}
              sx={{
                bgcolor: (theme) => theme.palette.grey[100],
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                p: 1,
                borderRadius: 2,
              }}
            >
              <Mui.Stack direction="row" alignItems="center" spacing={1}>
                <Mui.Avatar
                  src={
                    reviewer?.profile
                      ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                          import.meta.env.VITE_API_IP
                        }${import.meta.env.VITE_ASSETS_PATH}${reviewer?.profile}`
                      : `https://avatars.dicebear.com/api/initials/${reviewer?.username}.svg`
                  }
                />
                <Mui.Typography variant="body2" textTransform="capitalize">
                  {reviewer?.username}
                </Mui.Typography>
              </Mui.Stack>
              <Mui.Stack direction="row" spacing={0}>
                {new Array(5).fill(undefined).map((_val, index) => (
                  <Mui.IconButton
                    disableRipple
                    size="small"
                    key={index}
                    color={reviewer?.rating > index ? "primary" : undefined}
                  >
                    {reviewer?.rating > index ? (
                      <MuiIcons.Star />
                    ) : (
                      <MuiIcons.StarBorder />
                    )}
                  </Mui.IconButton>
                ))}
              </Mui.Stack>
              <Mui.Typography
                variant="caption"
                color="text.secondary"
                sx={{ pl: 1 }}
              >
                Reviewed On {new Date(reviewer.time).toLocaleString()}
              </Mui.Typography>
              <Mui.Typography
                variant="body2"
                sx={{ bgcolor: (theme) => theme.palette.grey[100], p: 1 }}
              >
                {reviewer?.comment}
              </Mui.Typography>
            </Mui.Stack>
          ))
        ) : (
          <Mui.Typography variant="h6" textAlign="center" sx={{ p: 5 }}>
            No Reviews Found
          </Mui.Typography>
        )}
      </Components.Global.Container>
    </Mui.Stack>
  ) : (
    <Components.Global.GlobalLoader />
  );
};
