import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.User.Kyc.Main />,
      children: [
        {
          path: "warning",
          element: <Pages.User.Dialogs.KycWarning />,
        },
      ],
    },
  ]);
