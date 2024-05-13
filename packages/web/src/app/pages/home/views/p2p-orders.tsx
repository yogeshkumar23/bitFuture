import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

export const P2POrderTable = ({
  trades,
  reviews,
  users,
  user,
}: {
  trades: p2pTrade[];
  reviews: p2p_review[];
  users: Hooks.User.UseUser.User[];
  user: Contexts.userContext.User | undefined;
}) => (
  <>
    <Mui.Table
      stickyHeader
      component={Mui.Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        display: { xs: "none", sm: "table" },
        bgcolor: "transparent",
        overflow: "hidden",
        "& .MuiTableCell-root": {
          bgcolor: "transparent",
        },
      }}
    >
      <Mui.TableHead
        sx={{
          bgcolor: (theme) => `${theme.palette.primary.main}20`,
        }}
      >
        <Mui.TableRow>
          <Mui.TableCell>Item</Mui.TableCell>
          <Mui.TableCell>Advertiser</Mui.TableCell>
          <Mui.TableCell>Price/Item</Mui.TableCell>
          <Mui.TableCell>Trade Limit</Mui.TableCell>
          <Mui.TableCell>Payment Method</Mui.TableCell>
          <Mui.TableCell>Ratings</Mui.TableCell>
          <Mui.TableCell></Mui.TableCell>
        </Mui.TableRow>
      </Mui.TableHead>
      {trades.filter(({ uid }) => uid !== user?.uid).length ? (
        trades
          .filter(({ uid }) => uid !== user?.uid)
          .slice(0, 10)
          .map((trade, index) => {
            const userReviews = reviews?.filter(({ uid }) => uid === trade.uid);
            const userRating = userReviews?.length
              ? userReviews
                  ?.map(({ rating }) => rating)
                  ?.reduce((a, b) => a + b, 0) / userReviews?.length
              : 0;
            const userDetails = users?.find(({ id }) => trade.uid === id);
            return (
              <Mui.TableRow key={index}>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    <Components.Global.Format
                      number={trade.noOfCoins - (trade?.tradedCoins || 0)}
                      type="coin"
                      coin={trade.coin}
                    />
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    <Mui.Link
                      component={Router.Link}
                      to={
                        !Boolean(user?.email)
                          ? `${Constants.API_CONFIG.base}account/login`
                          : `${Constants.API_CONFIG.base}p2p/${trade.uid}/info/BTC/buy`
                      }
                    >
                      {userDetails?.firstName} {userDetails?.lastName}
                    </Mui.Link>
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    <Components.Global.Format
                      number={trade.pricePerCoin}
                      type="coin"
                      coin={trade.currency}
                    />
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    {`${trade.quantityLimitFrom} - ${trade.quantityLimitTo}`}
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Typography variant="body1">
                    {+trade.prefferedPayment === 0
                      ? "All Payments"
                      : trade.prefferedPayment}
                  </Mui.Typography>
                </Mui.TableCell>
                <Mui.TableCell>
                  <Mui.Stack direction="row" spacing={0}>
                    {new Array(5).fill(undefined).map((_val, index) => (
                      <Mui.IconButton
                        disableRipple
                        size="small"
                        key={index}
                        color={userRating > index ? "primary" : undefined}
                      >
                        {userRating > index ? (
                          <MuiIcons.Star fontSize="inherit" />
                        ) : (
                          <MuiIcons.StarBorder fontSize="inherit" />
                        )}
                      </Mui.IconButton>
                    ))}
                  </Mui.Stack>
                </Mui.TableCell>
                <Mui.TableCell align="right">
                  <Mui.Button
                    id="tradeCoins"
                    variant="contained"
                    color={
                      trade.orderType?.toLowerCase() === "buy"
                        ? "error"
                        : "primary"
                    }
                    sx={{
                      width: 80,
                      textTransform: "capitalize",
                      borderRadius: 10,
                    }}
                    component={Router.Link}
                    to={
                      !Boolean(user?.email)
                        ? `${Constants.API_CONFIG.base}account/login`
                        : `${Constants.API_CONFIG.base}p2p/${trade.coin}/${trade.orderType}`
                    }
                  >
                    {trade.orderType?.toLowerCase() === "buy" ? "sell" : "buy"}
                  </Mui.Button>
                </Mui.TableCell>
              </Mui.TableRow>
            );
          })
      ) : (
        <Mui.TableRow>
          <Mui.TableCell colSpan={7}>
            <Mui.Typography
              variant="h6"
              textAlign="center"
              sx={{
                p: 5,
              }}
            >
              No Orders available in Market
            </Mui.Typography>
          </Mui.TableCell>
        </Mui.TableRow>
      )}
    </Mui.Table>
    <Mui.Box sx={{ display: { xs: "block", sm: "none" } }}>
      {trades.filter(({ uid }) => uid !== user?.uid).length ? (
        trades
          .filter(({ uid }) => uid !== user?.uid)
          .slice(0, 10)
          .map((trade, index) => {
            const userReviews = reviews?.filter(({ uid }) => uid === trade.uid);
            const userRating = userReviews?.length
              ? userReviews
                  ?.map(({ rating }) => rating)
                  ?.reduce((a, b) => a + b, 0) / userReviews?.length
              : 0;
            const userDetails = users?.find(({ id }) => trade.uid === id);
            return (
              <Mui.Card
                key={index}
                elevation={3}
                sx={{
                  p: 2,
                  m: { xs: 1, md: 3 },
                  borderRadius: 3,
                  display: { xs: "block", sm: "none" },
                }}
              >
                <Mui.Grid container spacing={2}>
                  <Mui.Grid item xs={12}>
                    <Mui.Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Mui.Typography variant="body1">
                        <Mui.Link
                          component={Router.Link}
                          to={
                            !Boolean(user?.email)
                              ? `${Constants.API_CONFIG.base}account/login`
                              : `${Constants.API_CONFIG.base}p2p/${trade.uid}/info/BTC/buy`
                          }
                        >
                          {userDetails?.firstName} {userDetails?.lastName}
                        </Mui.Link>
                      </Mui.Typography>
                      <Mui.Stack direction="row" spacing={0}>
                        {new Array(5).fill(undefined).map((_val, index) => (
                          <Mui.IconButton
                            disableRipple
                            size="small"
                            key={index}
                            color={userRating > index ? "primary" : undefined}
                          >
                            {userRating > index ? (
                              <MuiIcons.Star fontSize="inherit" />
                            ) : (
                              <MuiIcons.StarBorder fontSize="inherit" />
                            )}
                          </Mui.IconButton>
                        ))}
                      </Mui.Stack>
                    </Mui.Stack>
                  </Mui.Grid>
                  <Mui.Grid item xs={12}>
                    <Mui.Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Components.Global.StackLabel
                        title="Item"
                        label={
                          <Mui.Typography variant="body1">
                            <Components.Global.Format
                              number={
                                trade.noOfCoins - (trade?.tradedCoins || 0)
                              }
                              type="coin"
                              coin={trade.coin}
                            />
                          </Mui.Typography>
                        }
                        node
                      />
                      <Components.Global.StackLabel
                        title="Price/Item"
                        label={
                          <Mui.Typography variant="body1">
                            <Components.Global.Format
                              number={trade.pricePerCoin}
                              type="coin"
                              coin={trade.currency}
                            />
                          </Mui.Typography>
                        }
                        node
                      />
                      <Components.Global.StackLabel
                        title="Trade Limit"
                        label={
                          <Mui.Typography variant="body1">
                            {`${trade.priceLimitFrom} - ${trade.priceLimitTo}`}
                          </Mui.Typography>
                        }
                        node
                      />
                    </Mui.Stack>
                  </Mui.Grid>
                  <Mui.Grid item xs={12}>
                    <Mui.Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Components.Global.StackLabel
                        title="Payment Method"
                        label={
                          <Mui.Typography variant="body1">
                            {+trade.prefferedPayment === 0
                              ? "All Payments"
                              : trade.prefferedPayment}
                          </Mui.Typography>
                        }
                        node
                      />
                      <Mui.Button
                        variant="contained"
                        color={
                          trade.orderType?.toLowerCase() === "buy"
                            ? "error"
                            : "primary"
                        }
                        sx={{
                          width: 80,
                          textTransform: "capitalize",
                          borderRadius: 10,
                        }}
                        component={Router.Link}
                        to={
                          !Boolean(user?.email)
                            ? `${Constants.API_CONFIG.base}account/login`
                            : `${Constants.API_CONFIG.base}p2p/${trade.coin}/${trade.orderType}`
                        }
                      >
                        {trade.orderType?.toLowerCase() === "buy"
                          ? "sell"
                          : "buy"}
                      </Mui.Button>
                    </Mui.Stack>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Card>
            );
          })
      ) : (
        <Mui.Typography
          variant="h6"
          textAlign="center"
          sx={{
            p: 5,
          }}
        >
          No Orders available in Market
        </Mui.Typography>
      )}
    </Mui.Box>
  </>
);
