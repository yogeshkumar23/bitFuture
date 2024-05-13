import * as Ethers from "ethers";
import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const BuyView = () => {
  const { state } = Router.useLocation() as {
    state: nft & { users: Hooks.Admin.UseUser.User[] };
  };

  const UserDeatil = state?.users?.find(
    ({ metaMaskWallet }) =>
      metaMaskWallet?.toLowerCase() === state?.owner?.toLowerCase()
  ) || { firstName: "Not", lastName: "Set", email: "" };

  return state ? (
    <Components.Global.Dialog icon maxWidth="sm">
      <Mui.Box sx={{ position: "relative" }}>
        <Mui.CardMedia
          component="img"
          image={state?.tokenURI}
          alt=""
          sx={{
            border: `1px solid ${Mui.colors.grey[200]}`,
            bgcolor: (theme) => `${theme.palette.info.main}40`,
            height: 400,
            borderRadius: 5,
            objectFit: "cover",
            mt: -1,
          }}
        />
        <Mui.Stack
          component={Mui.DialogActions}
          spacing={1}
          alignItems="flex-start"
          sx={{
            position: "absolute",
            bottom: 0,
            bgcolor: "#00000090",
            color: "#ffffff",
            width: "100%",
            backdropFilter: "blur(10px)",
          }}
        >
          <Mui.Typography variant="body2" fontWeight={800}>
            Current Owner
          </Mui.Typography>
          <Mui.Typography variant="body2">
            {`Name : ${UserDeatil?.firstName} ${UserDeatil?.lastName}`}
          </Mui.Typography>
          <Mui.Typography variant="body2">{`Email : ${UserDeatil?.email}`}</Mui.Typography>
          <Mui.Typography variant="body2">
            {`Address : ${state?.owner}`}
          </Mui.Typography>
        </Mui.Stack>
      </Mui.Box>
      <Mui.Stack
        component={Mui.DialogContent}
        spacing={{ xs: 1, md: 2 }}
        direction="column"
        sx={{ overflowX: "hidden" }}
      >
        <Mui.ListItemText
          primary={
            <Mui.Typography
              variant="h6"
              noWrap
              sx={{ fontWeight: 800, width: 400 }}
            >
              {state?.metadata?.name}
            </Mui.Typography>
          }
          secondary={
            <Mui.Typography
              variant="body1"
              sx={{ fontWeight: 500, width: 400 }}
            >
              {state?.metadata?.description}
            </Mui.Typography>
          }
        />
        <Mui.Stack direction="row" justifyContent="space-between">
          <Mui.Typography
            color={
              state?.sale || state?.isAuction ? "success.main" : "error.main"
            }
            variant="body2"
          >
            {state?.isAuction
              ? "Available For Auction"
              : state?.sale
              ? "Available for Sale"
              : "Not ready for Sale"}
          </Mui.Typography>
          <Mui.Typography color="primary" variant="body2">
            Price{" "}
            <Components.Global.Format
              number={state?.price}
              type="coin"
              coin="ETH"
            />
          </Mui.Typography>
        </Mui.Stack>
        {state?.isAuction && (
          <Mui.Stack
            spacing={2}
            sx={{
              // bgcolor: (theme) => theme.palette.grey[100],
              minWidth: "100%",
              p: 2,
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}30`,
            }}
          >
            <Components.Global.Timer
              variant="body2"
              fontWeight={800}
              textAlign="center"
              color="error"
              time={state?.isAuctionDuration * 1000}
              sx={{ p: 1 }}
            >
              Auction Ends In{" "}
            </Components.Global.Timer>
            <Mui.Divider />
            <Components.Global.StackLabel
              direction={{ xs: "column", md: "row" } as any}
              title="Starting Price"
              label={
                <Components.Global.Format
                  type="coin"
                  number={state?.price}
                  coin="ETH"
                />
              }
              node
              medium
            />
            <Components.Global.StackLabel
              direction={{ xs: "column", md: "row" } as any}
              title="Maximum Bid Price"
              label={
                <Components.Global.Format
                  type="coin"
                  number={state?.highestBid}
                  coin="ETH"
                />
              }
              node
              medium
            />
            <Mui.TableContainer>
              <Mui.Table stickyHeader size="small">
                <Mui.TableHead>
                  {["ID", "Address", "Price"].map((title, index) => (
                    <Mui.TableCell
                      key={index}
                      sx={{ border: state?.bidders?.length ? "none" : "block" }}
                    >
                      {title}
                    </Mui.TableCell>
                  ))}
                </Mui.TableHead>
                <Mui.TableBody>
                  {state?.bidders?.length ? (
                    state?.bidders
                      ?.filter((bid) => Boolean(+bid.price))
                      ?.sort((a, b) => +b.price - +a.price)
                      ?.map((user, index) => (
                        <Mui.TableRow>
                          <Mui.TableCell
                            sx={{
                              border: "none",
                              bgcolor: (theme) =>
                                `${theme.palette.info.main}30`,
                              borderTopLeftRadius: 8,
                              borderBottomLeftRadius: 8,
                            }}
                          >
                            {index + 1}
                          </Mui.TableCell>
                          <Mui.TableCell
                            sx={{
                              border: "none",
                              bgcolor: (theme) =>
                                `${theme.palette.info.main}30`,
                            }}
                          >
                            <Mui.Typography
                              noWrap
                              variant="body2"
                              maxWidth={{ xs: 100, sm: 300 }}
                            >
                              {user.address}
                            </Mui.Typography>
                          </Mui.TableCell>
                          <Mui.TableCell
                            sx={{
                              border: "none",
                              bgcolor: (theme) =>
                                `${theme.palette.info.main}30`,
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                            }}
                          >
                            <Components.Global.Format
                              type="coin"
                              number={user.price}
                              coin="ETH"
                            />
                          </Mui.TableCell>
                        </Mui.TableRow>
                      ))
                  ) : (
                    <Mui.TableRow>
                      <Mui.TableCell colSpan={3}>
                        <Mui.Typography
                          variant="inherit"
                          textAlign="center"
                          sx={{ p: 2 }}
                        >
                          No Bidders Available
                        </Mui.Typography>{" "}
                      </Mui.TableCell>
                    </Mui.TableRow>
                  )}
                </Mui.TableBody>
              </Mui.Table>
            </Mui.TableContainer>
          </Mui.Stack>
        )}
      </Mui.Stack>
    </Components.Global.Dialog>
  ) : (
    <Router.Navigate to=".." />
  );
};
