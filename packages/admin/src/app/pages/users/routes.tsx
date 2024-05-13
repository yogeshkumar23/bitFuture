import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Router.Navigate to="details" />,
    },
    {
      path: "details/*",
      element: <Pages.Users.Main />,
      children: [
        { path: "ban", element: <Pages.Users.Dialogs.BanUser /> },
        { path: "suspend", element: <Pages.Users.Dialogs.SuspendUser /> },
        { path: "activate", element: <Pages.Users.Dialogs.ActivateUser /> },
        { path: "disable", element: <Pages.Users.Dialogs.Disable /> },
      ],
    },
    { path: "balance", element: <Pages.Users.Views.UserBalance /> },
    { path: "details/:userId/info", element: <Pages.Users.Views.UserInfo /> },
  ]);
