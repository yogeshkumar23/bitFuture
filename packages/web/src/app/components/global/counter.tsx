import * as Mui from "@mui/material";
import React from "react";

export const Counter = ({
  setFrontendExpire,
  time = 0,
  stop = false,
}: {
  setFrontendExpire: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  stop?: boolean;
}) => {
  const [timeRemain, setTimeRemian] = React.useState("0");
  React.useEffect(() => {
    const id = setInterval(() => {
      const difference = new Date().getTime() - time;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const min = Math.floor((difference / 1000 / 60) % 60);
      const sec = Math.floor((difference / 1000) % 60);
      if (
        days < 1 &&
        hrs < 1 &&
        min <= 29 &&
        !stop &&
        29 - min >= 0 &&
        59 - sec >= 0
      )
        setTimeRemian(`${29 - min}:${59 - sec}`);
      else {
        setFrontendExpire(true);
        setTimeRemian(`00:00`);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [stop]);
  return (
    <Mui.Typography variant="body2" color="error">
      Time Remaining: {timeRemain}
    </Mui.Typography>
  );
};
