import * as Mui from "@mui/material";
import * as MuiLab from "@mui/lab";
import React from "react";
import * as Contexts from "src/app/contexts";
import OTPInput from "react-otp-input-rc-17";
import * as Hooks from "src/app/hooks";
import * as Api from "src/api";
import * as Router from "react-router-dom";


export const DisableTwoFactor = () => {
  const user = React.useContext(Contexts.UserContext);
  const { sendMail, verify } = Hooks.User.useAuth();
  const [loading, setLoading] = React.useState(false);
  const [send, setSend] = React.useState(Boolean(!user?.enableTwoFactor));
  const [otp, setOtp] = React.useState("");
  const navigate = Router.useNavigate();
  const SendOtp = async () => {
    setLoading(true);
    await sendMail();
    setLoading(false);
    setSend(true);
  };

//   const Verify = async () => {
//     setLoading(true);
//     await verify(otp);
//     setLoading(false);
//   };

const disableTwoStep = async () => {
  await Api.Server.Request("enableTwoStepVerification", { status: "false" });
  navigate("disable");
  // update();
};

  return (
    <Mui.Stack
      spacing={2}
      sx={{
        bgcolor: (theme) => `${theme.palette.primary.main}20`,
        p: 2,
        borderRadius: 2,
      }}
    >
      <Mui.Typography variant="body2">
        {send
          ? `We have sent you the code at ${user?.email} Enter the code below.`
          : "Enter your email id. We’ll send a code to disable the two-factor authentication code."}
      </Mui.Typography>
      {send ? (
        <Mui.Stack
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          spacing={1}
          alignItems="flex-end"
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle="hide-border"
          />
          <MuiLab.LoadingButton
            variant="contained"
            onClick={disableTwoStep}
            loading={loading}
          >
            Disable
          </MuiLab.LoadingButton>
        </Mui.Stack>
      ) : (
        <Mui.Stack
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          spacing={1}
          alignItems="flex-end"
        >
          <Mui.TextField
            placeholder="Enter email"
            size="small"
            value={user?.email}
            disabled
            sx={{
              mr: 1,
              borderRadius: 2,
              bgcolor: "background.default",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />
          <MuiLab.LoadingButton
            variant="contained"
            onClick={SendOtp}
            loading={loading}
          >
            Send OTP
          </MuiLab.LoadingButton>
        </Mui.Stack>
      )}
    </Mui.Stack>
  );
};
