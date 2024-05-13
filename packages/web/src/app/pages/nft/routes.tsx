import React from "react";
import * as Router from "react-router-dom";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";

export default () => {
  const { account, syncedAccount, marketNfts, nfts, gasFee } = React.useContext(
    Contexts.UserContext
  );
  return Router.useRoutes([
    {
      path: "/",
      element: <Router.Navigate to="buy" />,
    },
    {
      path: ":type/*",
      element: (
        <Pages.NFT.Main
          account={account || ""}
          syncedAccount={syncedAccount || ""}
          marketNfts={marketNfts || []}
          nfts={nfts || []}
          gasFee={gasFee}
        />
      ),
      children: [
        {
          path: ":contract/:tokenId/sale",
          element: <Pages.NFT.Dialogs.Sale />,
        },
        {
          path: ":contract/:tokenId/view",
          element: <Pages.NFT.Dialogs.BuyView />,
        },
      ],
    },
  ]);
};
