import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Account.Login.Main />,
      children: [
        {
          path: "warning",
          element: <Pages.Account.Dialogs.MailVerify />,
        },
        {
          path: "blocked",
          element: <Pages.Account.Dialogs.AccountFalied />,
        },
      ],
    },
  ]);
