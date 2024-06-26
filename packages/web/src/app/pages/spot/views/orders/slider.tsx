// import * as Mui from "@mui/material";

// const PrettoSlider = Mui.styled(Mui.Slider)({
//   height: 5,
//   fontsize: 12,
//   "& .MuiSlider-track": {
//     border: "none",
//     bordeRadius: 50,
//     overflow: "hidden",
//   },
//   "& .MuiSlider-thumb": {
//     height: 15,
//     width: 15,
//     border: "2px solid #fff",
//     boxShadow: "0px 0px 1px 0px black",
//   },
//   "& .MuiSlider-mark": {
//     height: 5,
//     width: 2,
//     "&.MuiSlider-markActive": {
//       opacity: 1,
//       backgroundColor: "currentColor",
//     },
//   },
//   "& .MuiSlider-valueLabel": {
//     lineHeight: 1.2,
//     fontSize: 10,
//     background: "unset",
//     padding: 0,
//     width: 25,
//     height: 25,
//     borderRadius: "50% 50% 50% 0",
//     backgroundColor: "#398BD5",
//     transformOrigin: "bottom left",
//     transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
//     "&:before": { display: "none" },
//     "&.MuiSlider-valueLabelOpen": {
//       transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
//     },
//     "& > *": {
//       transform: "rotate(45deg)",
//     },
//   },
// });
// export const Slider = (props: Mui.SliderProps) => (
//   <PrettoSlider
//     id="balanceSlider"
//     size="small"
//     valueLabelDisplay="auto"
//     defaultValue={0}
//     valueLabelFormat={(value: number) => `${value.toFixed(0)}%`}
//     marks={[
//       {
//         value: 0,
//         label: "0%",
//       },
//       {
//         value: 25,
//         label: "25%",
//       },
//       {
//         value: 50,
//         label: "50%",
//       },
//       {
//         value: 75,
//         label: "75%",
//       },
//       {
//         value: 100,
//         label: "100%",
//       },
//     ]}
//     {...props}
//     sx={{ mt: "5px !important", mb: "20px !important" }}
//   />
// );

import * as Mui from "@mui/material";

const PrettoSlider = Mui.styled(Mui.Slider)({
  height: 5,
  fontsize: 12,
  "& .MuiSlider-track": {
    border: "none",
    bordeRadius: 50,
    overflow: "hidden",
  },
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    border: "2px solid #fff",
    boxShadow: "0px 0px 1px 0px black",
  },
  "& .MuiSlider-mark": {
    height: 5,
    width: 2,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 0,
    width: 25,
    height: 25,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#398BD5",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
export const Slider = (props: Mui.SliderProps) => (
  <PrettoSlider
    id="balanceSlider"
    size="small"
    valueLabelDisplay="auto"
    defaultValue={0}
    valueLabelFormat={(value: number) => `${value.toFixed(0)}%`}
    marks={[
      {
        value: 0,
        label: "0%",
      },
      {
        value: 25,
        label: "25%",
      },
      {
        value: 50,
        label: "50%",
      },
      {
        value: 75,
        label: "75%",
      },
      {
        value: 100,
        label: "100%",
      },
    ]}
    {...props}
    sx={{ mt: "5px !important", mb: "20px !important" }}
  />
);
