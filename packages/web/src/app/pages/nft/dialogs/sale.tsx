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

export const Sale = () => {
  const [loading, setLoading] = React.useState(false);
  const [approve, setApprove] = React.useState<boolean>();
  const navigate = Router.useNavigate();
  const [change, setChange] = React.useState<"sale" | "auction" | "transfer">(
    "sale"
  );
  const {
    account,
    gasFee,
    toggleSale,
    transfer,
    getApproval,
    isApproved,
    startAuction,
    stopAuction,
    executeAuction,
  } = React.useContext(Contexts.UserContext);
  const { type } = Router.useParams();
  const { state } = Router.useLocation() as { state: nft };

  const validateNFTSale = React.useMemo(
    () =>
      Yup.object().shape({
        price: Yup.number()
          .typeError("Invalid price")
          .min(+gasFee, "Price should be greater than gasFee")
          .required("Price is Required"),
      }),
    [gasFee]
  );

  const durationValidation = React.useMemo(
    () =>
      Yup.object().shape({
        price: Yup.number()
          .typeError("Invalid price")
          .min(+gasFee, "Price should be greater than gasFee")
          .required("Price is Required"),
        duration: Yup.string()
          .notOneOf(["0"], "Please select Duration")
          .required("Duration is required"),
      }),
    [gasFee]
  );

  const validateDeposit = React.useMemo(
    () =>
      Yup.object().shape({
        address: Yup.string()
          .notOneOf([account], "Self transfer does not support")
          .required("Deposit address required")
          .trim(),
      }),
    [account]
  );

  const Submit = async (
    { price }: nftsale.Form,
    { setSubmitting }: Formik.FormikHelpers<nftsale.Form>
  ) => {
    await toggleSale(state, price.toString()).finally(() => setLoading(false));
    setSubmitting(false);
    navigate(`${Constants.API_CONFIG.base}nft/${type}`);
  };

  const AuctionSubmit = async (
    { price, duration }: nftsale.AuctionForm,
    { setSubmitting }: Formik.FormikHelpers<nftsale.AuctionForm>
  ) => {
    if (!state?.isAuction) {
      const blockDuration = Math.floor(new Date().getTime() / 1000) + duration;
      await startAuction(
        state?.contract,
        state?.tokenId,
        price.toString(),
        blockDuration.toString()
      );
    } else {
      await executeAuction(state?.contract, state?.tokenId);
    }
    setSubmitting(false);
    navigate(`${Constants.API_CONFIG.base}nft/${type}`);
  };

  const TransferSubmit = async (
    { address }: { address: string },
    { setSubmitting }: Formik.FormikHelpers<{ address: string }>
  ) => {
    await transfer(state?.contract, address, state?.tokenId, true);
    setSubmitting(false);
    navigate(`${Constants.API_CONFIG.base}nft/${type}`);
  };

  const handleStop = async () => {
    setLoading(true);
    await stopAuction(state.contract, state?.tokenId).finally(() =>
      setLoading(false)
    );
    navigate(`${Constants.API_CONFIG.base}nft/${type}`);
  };

  const handleApprove = async () => {
    setLoading(true);
    await getApproval(state.contract, state?.tokenId)
      .then(setApprove)
      .finally(() => setLoading(false));
  };

  React.useLayoutEffect(() => {
    isApproved(state?.contract, state?.tokenId).then((isApprove: boolean) => {
      setApprove(isApprove);
    });
  }, [state?.tokenId]);

  return state ? (
    approve === undefined ? (
      <Components.Global.GlobalLoader />
    ) : (
      <Components.Global.Dialog icon maxWidth="sm">
        <Mui.Stack
          spacing={{ xs: 1, md: 2 }}
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
          sx={{ m: 2 }}
        >
          <Mui.CardMedia
            component="img"
            image={state?.tokenURI}
            alt=""
            sx={{
              border: `1px solid ${Mui.colors.grey[200]}`,
              bgcolor: (theme) => `${theme.palette.info.main}40`,
              width: 200,
              height: 200,
              m: 1,
              borderRadius: 5,
              objectFit: "cover",
            }}
          />
          <Mui.ListItemText
            primary={
              <Mui.Typography
                variant="h6"
                noWrap
                sx={{ fontWeight: 800, width: { xs: 300, sm: "100%" } }}
              >
                {state?.metadata?.name}
              </Mui.Typography>
            }
            secondary={
              <>
                <Mui.Typography
                  variant="body1"
                  noWrap
                  sx={{
                    fontWeight: 500,
                    width: { xs: 300, sm: "100%" },
                    mt: 1,
                  }}
                >
                  {state?.metadata?.description}
                </Mui.Typography>
                <Mui.Typography variant="body2" noWrap>
                  Token # {state?.tokenId}
                </Mui.Typography>
              </>
            }
          />
        </Mui.Stack>
        <Mui.Divider sx={{ mx: 3 }} />
        <Mui.Stack
          component={Mui.DialogContent}
          spacing={2}
          alignItems="center"
        >
          <Mui.ButtonGroup variant="outlined">
            <Mui.Button
              variant={change === "sale" ? "contained" : "outlined"}
              onClick={() => setChange("sale")}
            >
              Sale
            </Mui.Button>
            <Mui.Button
              variant={change === "auction" ? "contained" : "outlined"}
              onClick={() => setChange("auction")}
            >
              Auction
            </Mui.Button>
            <Mui.Button
              variant={change === "transfer" ? "contained" : "outlined"}
              onClick={() => setChange("transfer")}
            >
              Transfer
            </Mui.Button>
          </Mui.ButtonGroup>
          {!approve && !state?.sale && !state?.isAuction ? (
            <>
              <Mui.Typography
                variant="body2"
                fontWeight={700}
                color="text.secondary"
                textAlign="center"
                sx={{
                  p: 5,
                  borderRadius: 2,
                  bgcolor: (theme) => theme.palette.grey[100],
                }}
              >
                {Constants.NFT.name} need Approval for Market to handle your
                Asset
              </Mui.Typography>
              <MuiLab.LoadingButton
                loading={loading}
                color="success"
                variant="contained"
                // fullWidth
                sx={{ my: 2 }}
                onClick={handleApprove}
              >
                Approve
              </MuiLab.LoadingButton>
            </>
          ) : (
            {
              sale: (
                <Formik.Formik
                  initialValues={{
                    price: +state.price || ("" as unknown as number),
                  }}
                  validationSchema={validateNFTSale}
                  onSubmit={Submit}
                  enableReinitialize
                >
                  {() => (
                    <Formik.Form>
                      <Mui.Grid container spacing={2} marginTop={1}>
                        <Mui.Grid item xs={12}>
                          <Components.Form.AmountField
                            disabled={Boolean(state?.sale)}
                            label="Enter amount"
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
                        </Mui.Grid>
                        <Mui.Grid item xs={12}>
                          <Mui.Alert
                            severity="info"
                            icon={false}
                            sx={{ width: "100%" }}
                          >
                            <Mui.Typography variant="body2">
                              Note: Estimated Gas fee{" "}
                              {
                                <Components.Global.Format
                                  number={gasFee}
                                  type="coin"
                                  coin="ETH"
                                  fix={10}
                                />
                              }{" "}
                              will be applicable
                            </Mui.Typography>
                          </Mui.Alert>
                        </Mui.Grid>

                        <Mui.Grid item xs={12} sm={6}>
                          <Components.Form.SubmitButton
                            disabled={
                              Boolean(state?.sale) || Boolean(state?.isAuction)
                            }
                            sx={{ my: { sm: 2 }, maxWidth: 300 }}
                          >
                            Mark NFT for Sale
                          </Components.Form.SubmitButton>
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={6}>
                          <Components.Form.SubmitButton
                            disabled={!Boolean(state?.sale)}
                            color="error"
                            sx={{ my: { sm: 2 }, maxWidth: 300 }}
                          >
                            Cancel Sale
                          </Components.Form.SubmitButton>
                        </Mui.Grid>
                      </Mui.Grid>
                    </Formik.Form>
                  )}
                </Formik.Formik>
              ),
              auction: (
                <Formik.Formik
                  initialValues={{
                    price: +state.price || ("" as unknown as number),
                    duration: "0",
                  }}
                  validationSchema={durationValidation}
                  onSubmit={AuctionSubmit}
                  enableReinitialize
                >
                  {() => (
                    <Mui.Box component={Formik.Form} width="100%">
                      <Mui.Grid container spacing={2} marginTop={1}>
                        <Mui.Grid
                          item
                          xs={12}
                          md={6}
                          sx={{ display: state?.isAuction ? "none" : "grid" }}
                        >
                          <Components.Form.AmountField
                            disabled={Boolean(state?.isAuction)}
                            label="Starting Price"
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
                        </Mui.Grid>
                        <Mui.Grid
                          item
                          xs={12}
                          md={6}
                          sx={{ display: state?.isAuction ? "none" : "grid" }}
                        >
                          <Components.Form.SelectField
                            size="small"
                            name="duration"
                            label="Choose Duration"
                            defaultValue={0}
                          >
                            <Mui.MenuItem disabled value={0}>
                              <Mui.Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                Choose
                              </Mui.Typography>
                            </Mui.MenuItem>
                            {Object.entries(Constants.AuctionDurations).map(
                              ([key, time]) => (
                                <Mui.MenuItem value={time} key={key}>
                                  {key}
                                </Mui.MenuItem>
                              )
                            )}
                          </Components.Form.SelectField>
                        </Mui.Grid>
                        <Mui.Grid
                          item
                          xs={12}
                          sx={{ display: state?.isAuction ? "none" : "grid" }}
                        >
                          <Mui.Alert
                            severity="info"
                            icon={false}
                            sx={{ width: "100%" }}
                          >
                            <Mui.Typography variant="body2">
                              Note: Estimated Gas fee{" "}
                              {
                                <Components.Global.Format
                                  number={gasFee}
                                  type="coin"
                                  coin="ETH"
                                  fix={10}
                                />
                              }{" "}
                              will be applicable
                            </Mui.Typography>
                          </Mui.Alert>
                        </Mui.Grid>
                        <Mui.Grid
                          item
                          xs={12}
                          sx={{ display: state?.isAuction ? "grid" : "none" }}
                        >
                          <Mui.Stack
                            spacing={2}
                            sx={{
                              // bgcolor: (theme) => theme.palette.grey[100],
                              minWidth: "100%",
                              p: 2,
                              borderRadius: 2,
                              border: (theme) =>
                                `1px solid ${theme.palette.primary.main}30`,
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
                            <Mui.Divider />
                            <Mui.Typography
                              variant="body1"
                              fontWeight={600}
                              color="primary"
                            >
                              Top Bidders{" "}
                            </Mui.Typography>
                            <Mui.TableContainer>
                              <Mui.Table stickyHeader size="small">
                                <Mui.TableHead>
                                  {["ID", "Address", "Price"].map(
                                    (title, index) => (
                                      <Mui.TableCell
                                        key={index}
                                        sx={{
                                          border: state?.bidders?.length
                                            ? "none"
                                            : "block",
                                        }}
                                      >
                                        {title}
                                      </Mui.TableCell>
                                    )
                                  )}
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
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Components.Form.SubmitButton
                            disabled={
                              Boolean(state?.sale) ||
                              state?.isAuctionDuration >
                                new Date().getTime() / 1000 ||
                              loading
                            }
                            color="success"
                            sx={{ my: 1, maxWidth: 300 }}
                          >
                            {state?.isAuction ? "Execute" : "Start"}
                          </Components.Form.SubmitButton>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <MuiLab.LoadingButton
                            loading={loading}
                            disabled={!Boolean(state?.isAuction)}
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={{ my: 1, maxWidth: 300 }}
                            onClick={handleStop}
                          >
                            Stop
                          </MuiLab.LoadingButton>
                        </Mui.Grid>
                      </Mui.Grid>
                    </Mui.Box>
                  )}
                </Formik.Formik>
              ),
              transfer: (
                <Formik.Formik
                  initialValues={{
                    address: "",
                  }}
                  validationSchema={validateDeposit}
                  onSubmit={TransferSubmit}
                  enableReinitialize
                >
                  {() => (
                    <Formik.Form>
                      <Mui.Grid container spacing={2} marginTop={1}>
                        <Mui.Grid item xs={12}>
                          <DepositAddressField />
                        </Mui.Grid>
                        <Mui.Grid item xs={12}>
                          <Mui.Alert
                            severity="info"
                            icon={false}
                            sx={{ width: "100%" }}
                          >
                            <Mui.Typography variant="body2">
                              Note: Deposit fee{" "}
                              {
                                <Components.Global.Format
                                  number={gasFee}
                                  type="coin"
                                  coin="ETH"
                                  fix={10}
                                />
                              }{" "}
                              will be applicable
                            </Mui.Typography>
                          </Mui.Alert>
                        </Mui.Grid>
                        <Mui.Grid item xs={12}>
                          <Components.Form.SubmitButton
                            disabled={
                              Boolean(state?.sale) || Boolean(state?.isAuction)
                            }
                            sx={{
                              my: 2,
                              width: "fit-content",
                            }}
                          >
                            Transfer NFT
                          </Components.Form.SubmitButton>
                        </Mui.Grid>
                      </Mui.Grid>
                    </Formik.Form>
                  )}
                </Formik.Formik>
              ),
            }[change]
          )}
        </Mui.Stack>
      </Components.Global.Dialog>
    )
  ) : (
    <Router.Navigate to=".." />
  );
};

export const DepositAddressField = () => {
  const { values, setFieldValue } =
    Formik.useFormikContext<Record<string, string>>();
  React.useEffect(() => {
    setFieldValue("address", values["address"]?.toLowerCase());
  }, [values["address"]]);
  return (
    <Components.Form.FormField
      label="Enter Deposit Address"
      name="address"
      placeholder="0x..."
    />
  );
};

export declare namespace nftsale {
  export interface Form {
    price: number;
  }
  export interface AuctionForm {
    price: number;
    duration: string;
  }
}
