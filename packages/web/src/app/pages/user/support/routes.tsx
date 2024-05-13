import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/*",
      element: <Pages.User.Support.Main />,
      children: [
        { path: "/*", element: <Pages.User.Support.Views.CreateTicket /> },
        {
          path: "view/:ticketId",
          element: <Pages.User.Support.Views.ViewTicket />,
        },
      ],
    },
  ]);
