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
      element: <Pages.Spot.Main />,
      children: [
        { path: "edit", element: <Pages.Spot.Dialogs.AddEditPair /> },
        { path: "add", element: <Pages.Spot.Dialogs.AddEditPair /> },
      ],
    },
    {
      path: "trade_history",
      element: <Pages.Spot.Views.OrderHistory type="trades" />,
    },
    {
      path: "order_history",
      element: <Pages.Spot.Views.OrderHistory type="orders" />,
    },
    {
      path: "order_errors",
      element: <Pages.Spot.Views.OrderErrors />,
      children: [
        {
          path: "edit/:id",
          element: <Pages.Spot.Dialogs.EditStatus />,
        },
      ],
    },
  ]);
