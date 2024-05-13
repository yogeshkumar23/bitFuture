import React from "react";
import * as ReactQuery from "react-query";

export const useOrder = (
  availableBalance: number,
  availableCoins: number,
  marketValue: number,
  commission: number,
  type: "limit" | "market" | "stoplimit"
) => {
  const queryClient = ReactQuery.useQueryClient();
  const finalCommission = React.useMemo(() => commission / 100, [commission]);
  const [trigger, setTrigger] = React.useState<string>("");
  const [coins, setCoin] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [total, setTotal] = React.useState(amount + amount * finalCommission);
  const [limitPrice, setLimitPrice] = React.useState(marketValue);
  const [stopLimitPrice, setStopLimitPrice] = React.useState(marketValue);
  const [slider, setSlider] = React.useState(0);
  const [order, setOrder] = React.useState<"buy" | "sell">("buy");
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
    [limitPrice]
  );

  // handle Order Type
  const handleBuy = () => setOrder("buy");
  const handleSell = () => setOrder("sell");

  // handle Slider
  const handlePercentage = (_event: Event, value: number | number[]) => {
    if (!selectedBalance) return;
    setCoin(
      +(
        ((value as unknown as number) / 100) *
        (actualBalance / coinValue)
      ).toFixed(8)
    );
    setAmount(
      +(((value as unknown as number) / 100) * actualBalance).toFixed(2)
    );
  };

  const handleCoinAmount = () => {
    setAmount(actualBalance);
    setCoin(+(actualBalance / coinValue).toFixed(8));
  };

  // handle by Coin
  const handleCoin = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedBalance) return;
    const value = +event.target.value;
    if (value <= 0) {
      setCoin((coin) => coin);
      return;
    }
    if (value * coinValue * finalCommission > selectedBalance) {
      handleCoinAmount();
      return;
    }
    setCoin(value);
    setAmount(value * coinValue);
  };

  // handle user Amount
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedBalance) return;
    const value = +event.target.value;
    if (value <= 0) {
      setAmount((amount) => amount);
      return;
    }
    if (value * finalCommission > selectedBalance) {
      handleCoinAmount();
      return;
    }
    setAmount(value);
    setCoin(value / coinValue);
  };

  // handle limit price
  const handleLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!marketValue) return;
    const value = +event.target.value;
    // if (value <= 0) {
    //   setLimitPrice((price) => +price.toFixed(2));
    //   return;
    // }
    setLimitPrice(+value.toFixed(2));
  };

  // handle stop limit price
  const handleStopLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!marketValue) return;
    const value = +event.target.value;
    setStopLimitPrice(+value.toFixed(2));
  };

  // clear fields
  const clear = () => {
    setCoin(0);
    setAmount(0);
    setTotal(amount + amount * finalCommission);
    setLimitPrice(marketValue);
    setStopLimitPrice(marketValue);
    setSlider(0);
    setTimeout(() => queryClient.invalidateQueries("coin"), 1000);
  };

  // Trigger in change
  document.addEventListener("change", (e: any) => setTrigger(e.target.value));

  // Price corrections
  React.useEffect(() => {
    if (coins * coinValue * finalCommission > selectedBalance)
      handleCoinAmount();
    if (limitPrice > marketValue && order === "buy")
      setLimitPrice(+marketValue.toFixed(2));
    // if (stopLimitPrice >= marketValue && order === "buy")
    //   setStopLimitPrice(+marketValue.toFixed(2));
    // if (stopLimitPrice < marketValue && order === "sell")
    //   setStopLimitPrice(+marketValue.toFixed(2));
    if (limitPrice <= marketValue && order === "sell")
      setLimitPrice(+marketValue.toFixed(2));
  }, [trigger, order]);

  React.useEffect(() => {
    setSlider(+((amount / actualBalance) * 100).toFixed(2));
    setTotal(
      +(
        type === "market"
          ? amount + amount * finalCommission
          : coins * limitPrice + coins * limitPrice * finalCommission
      ).toFixed(2)
    );
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
