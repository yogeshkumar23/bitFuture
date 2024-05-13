import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Pages.User.Profile.Main />,
    },
    {
      path: "change-password",
      element: <Pages.User.Profile.Views.ChangePassword />,
    },
    {
      path: "edit/*",
      element: <Pages.User.Profile.Views.EditUser />,
      children: [
        {
          path: "remove-profile",
          element: <Pages.User.Dialogs.RemoveProfile />,
        },
      ],
    },
    {
      path: "two-factor",
      element: <Pages.User.Profile.Views.TwoFactor />,
      children: [
        {
          path: "success",
          element: <Pages.Account.Dialogs.Verified />,
        },
      ],
    },
  ]);
