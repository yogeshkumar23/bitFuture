import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Account.DisableTowFactor.Main />,
      children: [
        {
          path: "disable",
          element: <Pages.Account.Dialogs.DisableTwoFactorNotification />,
        },
      ],
    },
  ]);
