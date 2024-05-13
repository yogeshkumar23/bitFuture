import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Pages.NFT.Main />, //<Router.Navigate to="collections" />,
      children: [
        { path: "change-price", element: <Pages.NFT.Dialogs.ChangeGasFee /> },
      ],
    },
    {
      path: "/",
      element: <Pages.NFT.Main />,
      children: [
        {
          path: ":tokenId/view",
          element: <Pages.NFT.Views.BuyView />,
        },
      ],
    },
  ]);
