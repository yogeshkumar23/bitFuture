import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Referal.Main />,
      children: [
        { path: ":userId", element: <Pages.Referal.Dialogs.Referrals /> },
      ],
    },
  ]);
