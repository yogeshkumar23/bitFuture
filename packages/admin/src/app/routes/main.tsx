import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Layouts from "src/app/layouts";
import * as Routes from "src/app/routes";

const AdminRoute = React.lazy(() => import("src/app/pages/admins/routes"));
const UserRoute = React.lazy(() => import("src/app/pages/users/routes"));
const SpotRoute = React.lazy(() => import("src/app/pages/spot/routes"));
const P2PRoute = React.lazy(() => import("src/app/pages/p2p/routes"));
const NFTRoute = React.lazy(() => import("src/app/pages/nft/routes"));
const DashboardMain = React.lazy(() => import("src/app/pages/dashboard/main"));
const GeneralRoute = React.lazy(
  () => import("src/app/pages/general-updates/routes")
);
const KycRoute = React.lazy(() => import("src/app/pages/kyc/routes"));
const ReferalRoute = React.lazy(() => import("src/app/pages/referal/routes"));
const WalletRoute = React.lazy(() => import("src/app/pages/wallet/routes"));
const TicketRoute = React.lazy(() => import("src/app/pages/tickets/routes"));
const TransactionsRoute = React.lazy(
  () => import("src/app/pages/transactions/routes")
);
const ProfileRoute = React.lazy(
  () => import("src/app/pages/user/profile/routes")
);
const NotificationsMain = React.lazy(
  () => import("src/app/pages/user/notifications/main")
);
const LoginRoute = React.lazy(
  () => import("src/app/pages/account/login/routes")
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

const DisableTwoFactorRoute = React.lazy(
  () => import("src/app/pages/account/disable-two-factor/routes")
);

export const Main = () => {
  const user = React.useContext(Contexts.UserContext);
  return Constants.API_CONFIG.blockedCountry.includes(
    user?.detected_country || ""
  )
    ? Router.useRoutes([
        {
          path: "*",
          element: <Components.Templates.AccessBlocked />,
        },
      ])
    : Router.useRoutes([
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
              element: <Router.Navigate to="dashboard" />,
            },
            {
              path: "admins/*",
              element: (
                <Routes.Private protect>
                  <AdminRoute />
                </Routes.Private>
              ),
            },
            {
              path: "users/*",
              element: (
                <Routes.Private protect>
                  <UserRoute />
                </Routes.Private>
              ),
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
              path: "general_updates/*",
              element: (
                <Routes.Private protect>
                  <GeneralRoute />
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
              path: "referrals/*",
              element: (
                <Routes.Private protect>
                  <ReferalRoute />
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
              path: "tickets/*",
              element: (
                <Routes.Private protect>
                  <TicketRoute />
                </Routes.Private>
              ),
            },
            {
              path: "transactions/*",
              element: (
                <Routes.Private protect>
                  <TransactionsRoute />
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
              path: "notifications",
              element: (
                <Routes.Private protect>
                  <NotificationsMain />
                </Routes.Private>
              ),
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
              path: 'disable-two-factor/*',
              element: <DisableTwoFactorRoute />,
            },
          ],
        },
      ]);
};
