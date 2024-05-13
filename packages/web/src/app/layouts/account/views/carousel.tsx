import * as Mui from "@mui/material";
import React from "react";

export const Carousel = () => {
  const [index, setIndex] = React.useState(0);
  const handleClick = (value: number) => setIndex(value);
  React.useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev < 2 ? prev + 1 : 0)),
      5000
    );
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Mui.Stack
        sx={{
          position: "absolute",
          top: "57%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          width: 500,
        }}
      >
        <Mui.Box sx={{ position: "relative" }}>
          {[0, 1, 2].map((val, i) => (
            <Mui.Box
              key={i}
              sx={{
                position: "absolute",
                display: index === i ? "block" : "none",
              }}
            >
              <Mui.Typography variant="h5" sx={{ color: "#ffffff" }}>
                {
                  {
                    0: "Peer to Peer Trade Center",
                    1: "Secure Assets Management",
                    2: "Efficient Spot Trading",
                  }[index]
                }
              </Mui.Typography>
              <Mui.Typography variant="body1" sx={{ color: "#ffffff99" }}>
                {
                  {
                    0: "Sign up and explore the P2P trading of the different types of Assets with people all around the world just like you.",
                    1: "We offer asset management solutions to help you get started quickly, and also technology that helps you protect your digital assets.",
                    2: "Spot trading offers a higher chance of making a significant profit, and we take advantage of it to help you increase the value of your assets.",
                  }[index]
                }
              </Mui.Typography>
            </Mui.Box>
          ))}
        </Mui.Box>
      </Mui.Stack>
      <Mui.Stack
        justifyContent="center"
        direction="row"
        sx={{
          position: "absolute",
          top: "75%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          width: 500,
        }}
        spacing={1}
      >
        {[0, 1, 2].map((val, i) => (
          <Mui.Box
            key={i}
            sx={{
              borderRadius: "100%",
              bgcolor: (theme) => theme.palette.primary.main,
              height: 10,
              width: 10,
              border: index === i ? "2px solid #fff" : undefined,
            }}
            onClick={() => handleClick(val)}
          />
        ))}
      </Mui.Stack>
    </>
  );
};
