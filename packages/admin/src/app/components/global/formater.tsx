import Numeral from "numeral";
import React from "react";

export const isInt = (value: any) => {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
};

export const Format = React.memo(
  ({ number, fix, type, coin, negative }: format.price) => {
    const numLength = Math.floor(+(number || 0)).toString().length;
    const totalnNumLength =
      (+(number || 0) * 1)
        .toString()
        .match(/\.[0-9]{0,}/g)?.[0]
        ?.replace(".", "")?.length || 0;
    const length =
      totalnNumLength <= 6
        ? totalnNumLength
        : numLength >= 4
        ? 2
        : 6 - numLength;
    return (
      <>
        {`${
          type &&
          {
            coin: "",
            number: "",
            amount: "$",
            percentage: "",
            USD: "$",
            USDT: "₮",
          }[type]
        } ${Numeral(
          parseFloat(
            number
              ? number <= 0 && !negative
                ? `0`
                : `${number}`.match(
                    new RegExp(`^-?\\d+(?:\.\\d{0,${fix || length}})?`)
                  )?.[0] || `0`
              : `0`
          )
        ).format(`0,0.${new Array(fix || length).fill("0").join("")}`)} ${
          type &&
          {
            coin: coin,
            number: "",
            amount: "",
            percentage: "%",
            INR: "",
            USD: "",
            USDT: "",
          }[type]
        }`.trim()}
      </>
    );
  }
);

export const Formatfn = (number: string | unknown) =>
  Numeral(parseFloat(number as string) || 0).format("0,0.00");

export const timeFn = (time: string) =>
  new Date(time).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

export const formatDate = (date: Date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export declare namespace format {
  export interface price {
    number?: number | string;
    fix?: number;
    type: "coin" | "number" | "amount" | "percentage" | string | undefined;
    coin?: string;
    negative?: boolean;
  }
}
