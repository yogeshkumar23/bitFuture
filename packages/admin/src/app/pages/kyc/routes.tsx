import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Pages.Kyc.Main />,
      children: [
        {
          path: "details/*",
          element: <Pages.Kyc.Dialogs.Details />,
          children: [{ path: "reject", element: <Pages.Kyc.Dialogs.Reject /> }],
        },
      ],
    },
  ]);
