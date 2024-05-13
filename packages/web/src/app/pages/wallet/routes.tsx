import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Wallet.Main />,
      children: [
        {
          path: "deposit",
          element: <Pages.Wallet.Dialogs.Deposit />,
        },
        {
          path: "withdraw",
          element: <Pages.Wallet.Dialogs.Withdraw />,
        },
      ],
    },
  ]);
