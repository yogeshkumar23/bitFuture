import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Account.Reset.Main />,
      children: [
        {
          path: "success",
          element: <Pages.Account.Dialogs.ResetSuccess />,
        },
      ],
    },
  ]);
