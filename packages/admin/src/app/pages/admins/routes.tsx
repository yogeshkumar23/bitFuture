import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Admins.Main />,
      children: [
        { path: "disable", element: <Pages.Admins.Dialogs.Disable /> },
        {
          path: "create-account",
          element: <Pages.Admins.Dialogs.CreateAccount />,
        },
        { path: ":uid/view", element: <Pages.Admins.Dialogs.EditRights /> },
      ],
    },
  ]);
