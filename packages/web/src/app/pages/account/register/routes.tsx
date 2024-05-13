import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.Account.Register.Main />,
      children: [
        { path: "success", element: <Pages.Account.Dialogs.MailVerify /> },
        {
          path: "terms-of-service",
          element: <Pages.Account.Register.Dialogs.Terms />,
        },
      ],
    },
    {
      path: ":referal",
      element: <Pages.Account.Register.Main />,
      children: [
        { path: "success", element: <Pages.Account.Dialogs.MailVerify /> },
        {
          path: "terms-of-service",
          element: <Pages.Account.Register.Dialogs.Terms />,
        },
      ],
    },
  ]);
