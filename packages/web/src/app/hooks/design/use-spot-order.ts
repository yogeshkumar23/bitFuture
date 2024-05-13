import React from "react";
import * as ReactQuery from "react-query";
import * as Router from "react-router-dom";
import * as Hooks from "src/app/hooks";

export const useOrder = (
  availableBalance: number,
  availableCoins: number,
  marketValue: number,
  coin: Hooks.Main.UseCoin.coin,
  type: "limit" | "market" | "stoplimit"
) => {
  const { coinId } = Router.useParams();
  const queryClient = ReactQuery.useQueryClient();
  const [trigger, setTrigger] = React.useState<string>("");
  const [coins, setCoin] = React.useState<number>();
  const [amount, setAmount] = React.useState<number>();
  const [total, setTotal] = React.useState(0);
  const [limitPrice, setLimitPrice] = React.useState(marketValue);
  const [stopLimitPrice, setStopLimitPrice] = React.useState(marketValue);
  const [slider, setSlider] = React.useState(0);
  const [order, setOrder] = React.useState<"buy" | "sell">("buy");
  const finalCommission = React.useMemo(
    () => (order === "buy" ? coin.buyer_fees : coin.seller_fees) / 100,
    [coin, order]
  );
  const selectedBalance = React.useMemo(
    () => (order === "buy" ? availableBalance : availableCoins * marketValue),
    [order, availableBalance, availableCoins]
  );
  const actualBalance = React.useMemo(
    () => selectedBalance - selectedBalance * finalCommission,
    [selectedBalance, finalCommission]
  );
  const coinValue = React.useMemo(
    () => (type === "market" ? marketValue : limitPrice),
    [limitPrice, type, marketValue]
  );

  // handle Order Type
  const handleBuy = React.useCallback(() => setOrder("buy"), []);
  const handleSell = React.useCallback(() => setOrder("sell"), []);

  // handle Slider
  const handlePercentage = React.useCallback(
    (_event: Event, value: number | number[]) => {
      if (!selectedBalance) return;
      setCoin(
        +(
          ((value as unknown as number) / 100) *
          (selectedBalance / coinValue)
        ).toFixed(8)
      );
      setAmount(
        +(((value as unknown as number) / 100) * selectedBalance).toFixed(2)
      );
    },
    [selectedBalance, coinValue]
  );

  const handleCoinAmount = React.useCallback(() => {
    setAmount(actualBalance);
    setCoin(+(actualBalance / coinValue).toFixed(8));
  }, [actualBalance, coinValue]);

  // handle by Coin
  const handleCoin = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedBalance) return;
      const value = +event.target.value;
      if (value) {
        if (
          value * coinValue - value * coinValue * finalCommission >
          selectedBalance
        ) {
          handleCoinAmount();
          return;
        }
        setCoin(value);
        setAmount(value * coinValue);
      } else {
        setCoin(undefined);
        setAmount(undefined);
      }
    },
    [selectedBalance, coinValue, finalCommission]
  );

  // handle user Amount
  const handleAmount = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedBalance) return;
      const value = +event.target.value;
      if (value) {
        if (value - value * finalCommission > selectedBalance) {
          handleCoinAmount();
          return;
        }
        setAmount(value);
        setCoin(value / coinValue);
      } else {
        setAmount(undefined);
        setCoin(undefined);
      }
    },
    [selectedBalance, coinValue, finalCommission]
  );

  // handle limit price
  const handleLimit = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!marketValue) return;
      const value = +event.target.value;
      setLimitPrice(+value);
    },
    [marketValue]
  );

  // handle stop limit price
  const handleStopLimit = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!marketValue) return;
      const value = +event.target.value;
      setStopLimitPrice(+value);
    },
    [marketValue]
  );

  // clear fields
  const clear = () => {
    setCoin("" as unknown as number);
    setAmount("" as unknown as number);
    amount && setTotal(amount + amount * finalCommission);
    setLimitPrice(marketValue);
    setStopLimitPrice(marketValue);
    setSlider(0);
    setTimeout(() => queryClient.invalidateQueries("coin"), 1000);
  };

  // Trigger in change
  document.addEventListener("change", (e: any) => setTrigger(e.target.value));

  // Price corrections
  React.useEffect(() => {
    if (
      coins &&
      coins * coinValue - coins * coinValue * finalCommission > selectedBalance
    )
      handleCoinAmount();
    if (limitPrice > marketValue && order === "buy") setLimitPrice(marketValue);
    // if (stopLimitPrice >= marketValue && order === "buy")
    //   setStopLimitPrice(+marketValue.toFixed(2));
    // if (stopLimitPrice < marketValue && order === "sell")
    //   setStopLimitPrice(+marketValue.toFixed(2));
    if (limitPrice <= marketValue && order === "sell")
      setLimitPrice(marketValue);
    if (limitPrice === undefined) setLimitPrice(marketValue);
  }, [trigger, order, coinId, marketValue, finalCommission, selectedBalance]);

  React.useEffect(() => {
    if (amount && coins) {
      setSlider(+((amount / actualBalance) * 100).toFixed(2));
      setTotal(
        +(
          type === "market"
            ? amount + amount * finalCommission
            : coins * limitPrice + coins * limitPrice * finalCommission
        ).toFixed(2)
      );
    } else {
      setSlider(0);
      setTotal(0);
    }
  });

  return {
    amount,
    coins,
    total,
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
  };
};
