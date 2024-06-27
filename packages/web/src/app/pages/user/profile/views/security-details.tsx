import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import { useTranslation } from "react-i18next";

export const SecurityDetails = ({
  user,
  update,
}: {
  user: Contexts.userContext.User;
  update: () => void;
}) => {
  const disableTwoStep = async () => {
    await Api.Server.Request("enableTwoStepVerification", { status: "false" });
    update();
  };

  const { t } = useTranslation();

  return (
    <Components.Global.Container
      id="twoFactorAuthentication"
      direction="column"
      justifyContent="start"
      spacing={2}
    >
      <Mui.Typography variant="h5">{t('securityDetails')}</Mui.Typography>
      <Mui.Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Mui.Typography variant="body1">
          {t('twoFactorAuthentication')}
        </Mui.Typography>
        {!user?.enableTwoFactor ? (
          <Mui.Button
            variant="contained"
            component={Router.Link}
            to="two-factor"
          >
            {t('enable')}
          </Mui.Button>
        ) : (
          <Mui.Button
            color="secondary"
            variant="outlined"
            component={Router.Link}
            to="disable-two-factor"
            // onClick={disableTwoStep}
          >
           {t('disable')}
          </Mui.Button>
        )}
      </Mui.Stack>
    </Components.Global.Container>
  );
};
