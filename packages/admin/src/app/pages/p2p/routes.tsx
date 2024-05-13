import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Router.Navigate to="pairs" />,
    },
    {
      path: "pairs",
      element: <Pages.P2P.Main />,
      children: [
        { path: "edit", element: <Pages.P2P.Dialogs.AddEdit /> },
        { path: "add", element: <Pages.P2P.Dialogs.AddEdit /> },
      ],
    },
    {
      path: "order_history",
      element: <Pages.P2P.Views.OrderHistory />,
    },
    {
      path: "admin_revenues",
      element: <Pages.P2P.Views.AdminRevenues />,
    },
    { path: "disputes/detail", element: <Pages.P2P.Views.DisputeDetails /> },
    {
      path: "disputes",
      element: <Pages.P2P.Views.Disputes />,
    },
  ]);
