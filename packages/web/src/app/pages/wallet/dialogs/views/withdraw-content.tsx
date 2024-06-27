import * as Formik from "formik";
import * as Mui from "@mui/material";
import React from "react";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const Withdraw = ({
  chainList,
  verified,
}: {
  chainList: Hooks.User.UseCoinChains.chainList[] | undefined;
  verified: boolean;
}) => {
  const smsTime = 120000;
  const { state } = Router.useLocation() as {
    state: Hooks.User.coinsWallet;
  };
  const [timerEnabled, setTimerEnabled] = React.useState(false);
  const handler = Providers.useCustomHandler;
  const { values, setFieldValue } =
    Formik.useFormikContext<Record<string, string>>();

  const selectedChain = React.useMemo(
    () => chainList?.find((chain) => chain.chain === values["blockChain"]),
    [values["blockChain"]]
  );

  React.useEffect(() => {
    setFieldValue(
      "finalWithdrawAmount",
      +values["amount"] - (selectedChain?.withdrawalMinFee || 0)
    );
  }, [values["amount"], selectedChain?.withdrawalMinFee]);

  const handleGetOTP = () => {
    setTimerEnabled(true);
    setTimeout(() => {
      setTimerEnabled(false);
    }, smsTime);
    Api.Server.Request("twoStepVerification").then((res) => {
      handler({
        variant: res.error === "true" ? "error" : "success",
        message: res.message,
      });
    });
  };

  return (
    <Mui.Grid container spacing={2} marginY={1}>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.SelectField label="Network" name="blockChain">
          <Mui.MenuItem value="0" disabled>
            Choose NetWork
          </Mui.MenuItem>
          {chainList?.map((chain) => (
            <Mui.MenuItem
              value={chain.chain}
              key={chain.chain}
              disabled={chain.chain
                .toUpperCase()
                .includes("Currently unavailable")}
            >
              {chain.chainName.toUpperCase()}
            </Mui.MenuItem>
          ))}
        </Components.Form.SelectField>
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.AmountField
          label="Withdraw Amount"
          name="amount"
          InputProps={{
            endAdornment: (
              <Mui.InputAdornment position="end">
                <Mui.Typography
                  variant="caption"
                  color="primary"
                  fontWeight="bold"
                >
                  {state.coin}
                </Mui.Typography>
              </Mui.InputAdornment>
            ),
          }}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.FormField
          size="small"
          type="text"
          label="Withdraw Address"
          name="toAddress"
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={6}>
        <Components.Form.AmountField
          disabled
          label="Final Withdraw Amount"
          name="finalWithdrawAmount"
          InputProps={{
            endAdornment: (
              <Mui.InputAdornment position="end">
                <Mui.Typography
                  variant="caption"
                  color="primary"
                  fontWeight="bold"
                >
                  {state.coin}
                </Mui.Typography>
              </Mui.InputAdornment>
            ),
          }}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sm={12}>
        <Components.Form.FormField
          name="otp"
          label="Enter OTP"
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          onCopy={(e) => {
            e.preventDefault();
            return false;
          }}
          InputProps={{
            inputComponent: Components.Form
              .PhoneNumberFormat as unknown as React.ElementType<Mui.InputBaseComponentProps>,
            endAdornment: (
              <Mui.InputAdornment position="end">
                <Mui.Button
                  variant="contained"
                  sx={{ mr: -1.5 }}
                  onClick={handleGetOTP}
                  disabled={timerEnabled}
                >
                  {timerEnabled ? (
                    <Components.Global.Timer
                      color="inherit"
                      time={new Date().getTime() + smsTime}
                    />
                  ) : (
                    "Get OTP"
                  )}
                </Mui.Button>
              </Mui.InputAdornment>
            ),
          }}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={{ display: selectedChain ? "flex" : "none" }}>
        <Mui.Alert severity="warning" icon={false}>
          <Mui.AlertTitle>Note:</Mui.AlertTitle>
          <Mui.ListItem>
            Withdraw fee{" "}
            <Components.Global.Format
              type="coin"
              number={selectedChain?.withdrawalMinFee}
              coin={state?.typeId}
            />{" "}
            will be applicable, and Minimum withdraw Amount is{" "}
            <Components.Global.Format
              type="coin"
              number={selectedChain?.withdrawalMinSize}
              coin={state?.typeId}
            />
          </Mui.ListItem>
        </Mui.Alert>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {verified ? (
          <Components.Form.SubmitButton sx={{ width: "fit-content" }}>
            Withdraw
          </Components.Form.SubmitButton>
        ) : (
          <Mui.Button
            component={Router.Link}
            to={`${Constants.API_CONFIG.base}kyc/warning`}
            variant="contained"
            sx={{ mt: { lg: "auto !important" }, mb: { lg: 0 } }}
          >
            Withdraw
          </Mui.Button>
        )}
      </Mui.Grid>
    </Mui.Grid>
  );
};
