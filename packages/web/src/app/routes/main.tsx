import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Layouts from "src/app/layouts";
import * as Pages from "src/app/pages";
import * as Routes from "src/app/routes";

const HomeMain = React.lazy(() => import("src/app/pages/home/main"));
const SpotRoute = React.lazy(() => import("src/app/pages/spot/routes"));
const P2PRoute = React.lazy(() => import("src/app/pages/p2p/routes"));
const NFTRoute = React.lazy(() => import("src/app/pages/nft/routes"));
const DashboardMain = React.lazy(() => import("src/app/pages/dashboard/main"));
const WalletRoute = React.lazy(() => import("src/app/pages/wallet/routes"));
const ProfileRoute = React.lazy(
  () => import("src/app/pages/user/profile/routes")
);
const InviteMain = React.lazy(() => import("src/app/pages/user/invite/main"));
const KycRoute = React.lazy(() => import("src/app/pages/user/kyc/routes"));
const SupportRoute = React.lazy(
  () => import("src/app/pages/user/support/routes")
);
const NotificationMain = React.lazy(
  () => import("src/app/pages/user/notifications/main")
);
const TermsOfServices = React.lazy(
  () => import("src/app/pages/company/terms-of-services")
);
const PrivacyPolicy = React.lazy(
  () => import("src/app/pages/company/privacy-policy")
);
const LoginRoute = React.lazy(
  () => import("src/app/pages/account/login/routes")
);
const RegisterRoute = React.lazy(
  () => import("src/app/pages/account/register/routes")
);
const ForgotRoute = React.lazy(
  () => import("src/app/pages/account/forgot-password/routes")
);
const ResetRoute = React.lazy(
  () => import("src/app/pages/account/reset-password/routes")
);
const TwoFactorRoute = React.lazy(
  () => import("src/app/pages/account/two-factor/routes")
);

export const Main = () => {
  const { user } = React.useContext(Contexts.UserContext);
  return Boolean(user?.is_Suspended) ? (
    <Components.Templates.AccountSuspended />
  ) : Constants.API_CONFIG.blockedCountry.includes(
      user?.detected_country || ""
    ) ? (
    Router.useRoutes([
      {
        path: "*",
        element: <Components.Templates.AccessBlocked />,
      },
    ])
  ) : (
    Router.useRoutes([
      {
        path: "*",
        element: <Components.Templates.PageNotFound />,
      },
      {
        path: `${Constants.API_CONFIG.base}*`,
        element: <Layouts.Main.Main />,
        children: [
          {
            path: "*",
            element: <Router.Navigate to="/" />,
          },
          {
            path: "",
            element: <HomeMain />,
            children: [
              {
                path: "contact",
                element: <Pages.Home.Dialogs.ContactUs.Main />,
              },
            ],
          },
          {
            path: "spot/*",
            element: (
              <Routes.Private protect>
                <SpotRoute />
              </Routes.Private>
            ),
          },
          {
            path: "p2p/*",
            element: (
              <Routes.Private protect>
                <P2PRoute />
              </Routes.Private>
            ),
          },
          {
            path: "nft/*",
            element: (
              <Routes.Private protect>
                <NFTRoute />
              </Routes.Private>
            ),
          },
          {
            path: "dashboard",
            element: (
              <Routes.Private protect>
                <DashboardMain />
              </Routes.Private>
            ),
          },
          {
            path: "wallet/*",
            element: (
              <Routes.Private protect>
                <WalletRoute />
              </Routes.Private>
            ),
          },
          {
            path: "profile/*",
            element: (
              <Routes.Private protect>
                <ProfileRoute />
              </Routes.Private>
            ),
          },
          {
            path: "invite",
            element: (
              <Routes.Private protect>
                <InviteMain />
              </Routes.Private>
            ),
          },
          {
            path: "kyc/*",
            element: (
              <Routes.Private protect>
                <KycRoute />
              </Routes.Private>
            ),
          },
          {
            path: "help-center/*",
            element: (
              <Routes.Private protect>
                <SupportRoute />
              </Routes.Private>
            ),
          },
          {
            path: "notifications",
            element: (
              <Routes.Private protect>
                <NotificationMain />
              </Routes.Private>
            ),
          },
          {
            path: "terms-of-service",
            element: <TermsOfServices />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
        ],
      },
      {
        path: `${Constants.API_CONFIG.base}account/*`,
        element: <Layouts.Account.Main />,
        children: [
          {
            path: "*",
            element: <Router.Navigate to="login" />,
          },
          {
            path: "login/*",
            element: (
              <Routes.Private>
                <LoginRoute />
              </Routes.Private>
            ),
          },
          {
            path: "register/*",
            element: (
              <Routes.Private>
                <RegisterRoute />
              </Routes.Private>
            ),
          },
          {
            path: "forgot-password/*",
            element: (
              <Routes.Private>
                <ForgotRoute />
              </Routes.Private>
            ),
          },
          {
            path: "reset-password/*",
            element: (
              <Routes.Private>
                <ResetRoute />
              </Routes.Private>
            ),
          },
          {
            path: "two-factor/*",
            element: <TwoFactorRoute />,
          },
          {
            path: "terms-of-service",
            element: <TermsOfServices />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
        ],
      },
    ])
  );
};
