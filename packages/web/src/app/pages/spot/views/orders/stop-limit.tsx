// import React from "react";
// import * as Contexts from "src/app/contexts";
// import * as Hooks from "src/app/hooks";
// import * as Pages from "src/app/pages";
// import * as Providers from "src/app/providers";

// export const StopLimit = ({
//   amountBalance,
//   coinBalance,
//   coin,
// }: {
//   amountBalance: number;
//   coinBalance: number;
//   coin: Hooks.Main.UseCoin.coin;
// }) => {
//   const handler = Providers.useCustomHandler;
//   const { user } = React.useContext(Contexts.UserContext);
//   const { loading, trade } = Hooks.Main.useSpotTrade(
//     user?.uid as string,
//     coin?.bot_status
//   );
//   const marketValue = coin.current_price;
//   const commission = coin.commission;
//   const {
//     amount,
//     coins,
//     limitPrice,
//     stopLimitPrice,
//     slider,
//     order,
//     clear,
//     handleAmount,
//     handleCoin,
//     handleLimit,
//     handleStopLimit,
//     handlePercentage,
//     handleBuy,
//     handleSell,
//   } = Hooks.Design.useOrder(
//     amountBalance,
//     coinBalance,
//     marketValue,
//     coin,
//     "limit"
//   );

//   const handleSubmit = () => {
//     // Stop Buy
//     const newOrderBuy: trade = {
//       coinId: coin?.coinId as string,
//       coin: coin.coin,
//       coinPair: coin.currency,
//       commission,
//       limitPrice,
//       stopPrice: stopLimitPrice,
//       noOfCoins:
//         (["binance", "kucoin"].includes(coin.bot_status) ? amount : coins) || 0,
//       orderType: 3,
//       orderPlacedTime: new Date().getTime(),
//       uid: user?.uid as string,
//     };

//     // Stop Sell
//     const newOrderSell: trade = {
//       coinId: coin?.coinId as string,
//       coin: coin.coin,
//       coinPair: coin.currency,
//       commission,
//       limitPrice,
//       stopPrice: stopLimitPrice,
//       noOfCoins: coins || 0,
//       orderType: 6,
//       orderPlacedTime: new Date().getTime(),
//       uid: user?.uid as string,
//     };
//     if (
//       (order === "buy" && (amount || 0) > amountBalance) ||
//       (order === "sell" && (coins || 0) > coinBalance)
//     )
//       handler({
//         message: "Insufficient balance!",
//         variant: "error",
//       });
//     else trade(order === "buy" ? newOrderBuy : newOrderSell, amount || 0);
//     clear();
//   };

//   return (
//     <>
//       <Pages.Spot.Views.Orders.OrderButton
//         coin={coin?.coin as string}
//         order={order}
//         handleBuy={handleBuy}
//         handleSell={handleSell}
//       />
//       <Pages.Spot.Views.Orders.SpotField
//         start="Stop Price"
//         end={coin?.currency as string}
//         onChange={handleStopLimit}
//         value={stopLimitPrice}
//       />
//       <Pages.Spot.Views.Orders.SpotField
//         start="Limit Price"
//         end={coin?.currency as string}
//         onChange={handleLimit}
//         value={limitPrice}
//       />
//       {order === "buy" ? (
//         <Pages.Spot.Views.Orders.SpotField
//           start="Amount"
//           end={coin?.currency as string}
//           onChange={handleAmount}
//           value={amount}
//         />
//       ) : (
//         <Pages.Spot.Views.Orders.SpotField
//           start="Amount"
//           end={coin?.coin as string}
//           onChange={handleCoin}
//           value={coins}
//         />
//       )}
//       <Pages.Spot.Views.Orders.Slider
//         value={slider}
//         onChange={handlePercentage}
//       />
//       <Pages.Spot.Views.Orders.SpotField
//         start="Total"
//         end={(order === "buy" ? coin?.coin : coin?.currency) as string}
//         value={(order === "buy" ? coins || 0 : amount || 0).toFixed(5)}
//         disabled
//         sx={{
//           bgcolor: (theme) => `${theme.palette.error.light}20`,
//           borderRadius: 1,
//           "& fieldset": {
//             borderWidth: 0,
//           },
//         }}
//       />
//       <Pages.Spot.Views.Orders.PlaceOrder
//         onClick={handleSubmit}
//         loading={loading}
//       />
//     </>
//   );
// };

import React from "react";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Pages from "src/app/pages";
import * as Providers from "src/app/providers";

export const StopLimit = ({
  amountBalance,
  coinBalance,
  coin,
}: {
  amountBalance: number;
  coinBalance: number;
  coin: Hooks.Main.UseCoin.coin;
}) => {
  const handler = Providers.useCustomHandler;
  const { user } = React.useContext(Contexts.UserContext);
  const { loading, trade } = Hooks.Main.useSpotTrade(
    user?.uid as string,
    coin?.bot_status
  );
  const marketValue = coin.current_price;
  const commission = coin.commission;
  const {
    amount,
    coins,
    limitPrice,
    stopLimitPrice,
    slider,
    order,
    clear,
    handleAmount,
    handleCoin,
    handleLimit,
    handleStopLimit,
    handlePercentage,
    handleBuy,
    handleSell,
  } = Hooks.Design.useOrder(
    amountBalance,
    coinBalance,
    marketValue,
    coin,
    "limit"
  );

  const handleSubmit = () => {
    // Stop Buy
    const newOrderBuy: trade = {
      coinId: coin?.coinId as string,
      coin: coin.coin,
      coinPair: coin.currency,
      commission,
      limitPrice,
      stopPrice: stopLimitPrice,
      noOfCoins:
        (["bybit", "kucoin"].includes(coin.bot_status) ? amount : coins) || 0,
      orderType: 3,
      orderPlacedTime: new Date().getTime(),
      uid: user?.uid as string,
    };

    // Stop Sell
    const newOrderSell: trade = {
      coinId: coin?.coinId as string,
      coin: coin.coin,
      coinPair: coin.currency,
      commission,
      limitPrice,
      stopPrice: stopLimitPrice,
      noOfCoins: coins || 0,
      orderType: 6,
      orderPlacedTime: new Date().getTime(),
      uid: user?.uid as string,
    };
    if (
      (order === "buy" && (amount || 0) > amountBalance) ||
      (order === "sell" && (coins || 0) > coinBalance)
    )
      handler({
        message: "Insufficient balance!",
        variant: "error",
      });
    else trade(order === "buy" ? newOrderBuy : newOrderSell, amount || 0);
    clear();
  };

  return (
    <>
      <Pages.Spot.Views.Orders.OrderButton
        coin={coin?.coin as string}
        order={order}
        handleBuy={handleBuy}
        handleSell={handleSell}
      />
      <Pages.Spot.Views.Orders.SpotField
        start="Stop Price"
        end={coin?.currency as string}
        onChange={handleStopLimit}
        value={stopLimitPrice}
      />
      <Pages.Spot.Views.Orders.SpotField
        start="Limit Price"
        end={coin?.currency as string}
        onChange={handleLimit}
        value={limitPrice}
      />
      {order === "buy" ? (
        <Pages.Spot.Views.Orders.SpotField
          start="Amount"
          end={coin?.currency as string}
          onChange={handleAmount}
          value={amount}
        />
      ) : (
        <Pages.Spot.Views.Orders.SpotField
          start="Amount"
          end={coin?.coin as string}
          onChange={handleCoin}
          value={coins}
        />
      )}
      <Pages.Spot.Views.Orders.Slider
        value={slider}
        onChange={handlePercentage}
      />
      <Pages.Spot.Views.Orders.SpotField
        start="Total"
        end={(order === "buy" ? coin?.coin : coin?.currency) as string}
        value={(order === "buy" ? coins || 0 : amount || 0).toFixed(5)}
        disabled
        sx={{
          bgcolor: (theme) => `${theme.palette.error.light}20`,
          borderRadius: 1,
          "& fieldset": {
            borderWidth: 0,
          },
        }}
      />
      <Pages.Spot.Views.Orders.PlaceOrder
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};
