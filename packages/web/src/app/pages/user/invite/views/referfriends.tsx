import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Assets from "src/assets";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";

export const ReferFriends = () => {
  const { contentCopy } = Hooks.User.useUtils();
  const { referralCode, loading } = Hooks.User.useGetReferralLink();
  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Paper
      component={Mui.Stack}
      spacing={3}
      sx={{
        height: { sm: 350 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url('${Assets.BannerBg}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "fill",
        borderRadius: 4,
        p: 4,
      }}
      alignItems="start"
    >
      <Pages.Views.IntroJSConfig name="invite" />
      <Mui.Box sx={{ p: { md: 2 } }} />
      <Mui.Container maxWidth="sm" component={Mui.Stack} spacing={2}>
        <Mui.Typography variant="h5" color="white">
          Refer Your Friends And Get Rewards
        </Mui.Typography>
        <Mui.Typography variant="body1" sx={{ color: "#fff" }}>
          Tell your friends about BitFuture. Copy and paste the referral URL provided
          below to as many people as possible. Receive interesting incentives
          and deals as a reward for your recommendation!
        </Mui.Typography>
        <Mui.Stack direction="row" spacing={1}>
          <Mui.TextField
            id="referralLink"
            variant="outlined"
            size="small"
            value={`${window.location.origin}${Constants.API_CONFIG.base}account/register/${referralCode}`}
            sx={{
              borderRadius: 1,
              bgcolor: "primary.dark",
              "& fieldset": {
                borderWidth: 0,
              },
              "& input": {
                color: "#fff",
              },
            }}
            contentEditable={false}
            fullWidth
          />
          <Mui.IconButton
            id="copyReferralLink"
            sx={{
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#fff",
              },
              borderRadius: 2,
            }}
            onClick={() =>
              contentCopy(
                `${window.location.origin}${Constants.API_CONFIG.base}account/register/${referralCode}`
              )
            }
          >
            <MuiIcons.ContentCopy color="primary" />
          </Mui.IconButton>
        </Mui.Stack>
      </Mui.Container>
    </Mui.Paper>
  );
};
