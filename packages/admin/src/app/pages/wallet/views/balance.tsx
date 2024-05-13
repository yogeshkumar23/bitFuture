import * as FirebaseFirestore from "firebase/firestore";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Balance = ({ coin, price }: { coin: string; price: number }) => {
  const { data: coinFee } = Hooks.Firebase.useFireSnapshot<tradeBook>(
    "collectionGroup",
    `trade_book`
  ).collectionSnapshot([
    FirebaseFirestore.where("coin", "==", coin),
    FirebaseFirestore.where("status", "==", "completed"),
  ]);

  return (
    <Components.Global.Format
      number={
        (coinFee
          ?.map(({ commisionAmount }) => commisionAmount)
          ?.reduce((a, b) => a + b, 0) || 0) / price
      }
      type="coin"
      coin={coin}
    />
  );
};
