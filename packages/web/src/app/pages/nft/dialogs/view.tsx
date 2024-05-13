import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import React from "react";
import * as Router from "react-router-dom";
import * as Yup from "yup";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const BuyView = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = Router.useNavigate();
  const { buyNFT, gasFee, placeBid, account } = React.useContext(
    Contexts.UserContext
  );
  const { type } = Router.useParams();
  const { state } = Router.useLocation() as { state: nft };
  const buy = async () => {
    setLoading(true);
    await buyNFT(
      state?.contract,
      state?.tokenId,
      (+state.price + +gasFee).toString()
    ).finally(() => setLoading(false));
    navigate(`${Constants.API_CONFIG.base}nft/${type}`);
  };

  const validateNFTSale = React.useMemo(
    () =>
      Yup.object().shape({
        price: Yup.number()
          .typeError("Invalid price")
          .min(
            +state?.highestBid || +state?.price,
            `Price should be greater than ${
              +state?.highestBid ? "current maximum bid" : "intial"
            } price`
          )
          .required("Please enter value"),
      }),
    [state]
  );

  const ended = React.useMemo(
    () => state?.isAuctionDuration < new Date().getTime() / 1000,
    [new Date().getTime().toString()]
  );
  const Submit = async (
    { price }: { price: number },
    { setSubmitting }: Formik.FormikHelpers<{ price: number }>
  ) => {
    await placeBid(state?.contract, state?.tokenId, price.toString()).finally(
      () => setLoading(false)
    );
    setSubmitting(false);
    navigate(`${Constants.API_CONFIG.base}nft/${type}`);
  };

  return state ? (
    <Components.Global.Dialog icon maxWidth="sm">
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
              sx={{ fontWeight: 800, maxWidth: 400 }}
            >
              {state?.metadata?.name}
            </Mui.Typography>
          }
          secondary={
            <Mui.Typography
              variant="body1"
              noWrap
              sx={{ fontWeight: 500, mt: 1, maxWidth: 400 }}
            >
              {state?.metadata?.description}
            </Mui.Typography>
          }
        />
        <Mui.Divider sx={{ mx: 3 }} />
        <Mui.Alert severity="info">
          <Mui.Typography variant="caption" color="info.main">
            Estimated GasFee:{" "}
            <Components.Global.Format number={gasFee} type="coin" coin="ETH" />
          </Mui.Typography>
        </Mui.Alert>
        {state?.isAuction && (
          <Mui.Stack
            spacing={2}
            sx={{
              // bgcolor: (theme) => theme.palette.grey[100],
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
              medium
              node
            />
            <Components.Global.StackLabel
              direction={{ xs: "column", md: "row" } as any}
              title="Current Maximum Bid Price"
              label={
                <Components.Global.Format
                  type="coin"
                  number={+state?.highestBid || +state?.price}
                  coin="ETH"
                />
              }
              medium
              node
            />
            {/* <Components.Global.StackLabel
              direction={{ xs: "column", md: "row" } as any}
              title="Maximum Bidder"
              label={
                <Mui.Typography noWrap variant="inherit" maxWidth={200}>
                  {state?.highestBidder}
                </Mui.Typography>
              }
              node
            /> */}
          </Mui.Stack>
        )}
      </Mui.Stack>
      <Mui.DialogActions sx={{ mb: 2, flexDirection: "column" }}>
        {state?.isAuction ? (
          state?.highestBidder?.toLowerCase() === account?.toLowerCase() ? (
            <Mui.Typography
              variant="body2"
              textAlign="center"
              sx={{ bgcolor: "info.light", p: 2, borderRadius: 2 }}
            >
              You're current highest bidder of the token
            </Mui.Typography>
          ) : (
            <Formik.Formik
              initialValues={{
                price: "" as unknown as number,
              }}
              validationSchema={validateNFTSale}
              onSubmit={Submit}
            >
              {() => (
                <Mui.Stack
                  // direction="row"
                  spacing={2}
                  // alignItems="flex-end"
                  component={Formik.Form}
                >
                  <Components.Form.AmountField
                    disabled={Boolean(state?.sale)}
                    label={`Enter amount`}
                    name="price"
                    InputProps={{
                      endAdornment: (
                        <Mui.InputAdornment position="end">
                          <Mui.Typography
                            variant="caption"
                            color="primary"
                            fontWeight="bold"
                          >
                            ETH
                          </Mui.Typography>
                        </Mui.InputAdornment>
                      ),
                    }}
                  />
                  <Components.Form.SubmitButton
                    disabled={
                      Boolean(state?.sale) ||
                      ended ||
                      state?.highestBidder?.toLowerCase() ===
                        account?.toLowerCase()
                    }
                    sx={{
                      my: 2,
                      px: 3,
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    Place a Bid
                  </Components.Form.SubmitButton>
                </Mui.Stack>
              )}
            </Formik.Formik>
          )
        ) : (
          <MuiLab.LoadingButton
            loading={loading}
            color="success"
            variant="contained"
            onClick={buy}
          >
            Buy with{" "}
            <Components.Global.Format
              number={state?.price}
              type="coin"
              coin="ETH"
            />
          </MuiLab.LoadingButton>
        )}
      </Mui.DialogActions>
    </Components.Global.Dialog>
  ) : (
    <Router.Navigate to=".." />
  );
};
