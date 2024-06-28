import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Router.Navigate to="wallet" />,
    },
    {
      path: "deposit_withdraw",
      element: <Pages.Transactions.Main />,
    },
    { path: "pay", element: <Pages.Transactions.Views.PayTransactions /> },
  ]);
