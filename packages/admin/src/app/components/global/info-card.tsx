import * as Mui from "@mui/material";

export const InfoCard = ({ image, title, content }: infoCard.Props) => (
  <Mui.Card
    component={Mui.Stack}
    alignItems="center"
    sx={{
      p: 4,
      borderRadius: 5,
      minHeight: 300,
      width: "fit-content",
      maxWidth: 350,
      mx: "20px !important",
      boxShadow: (theme) => `0px 20px 25px -30px ${theme.palette.text.primary}`,
      "&:hover": {
        bgcolor: (theme) => `${theme.palette.primary.main}20`,
      },
    }}
  >
    <Mui.CardMedia component="img" src={image} sx={{ width: 50 }} />
    <Mui.Typography
      sx={{ textAlign: "center", fontWeight: "600", p: 1 }}
      variant="h6"
    >
      {title}
    </Mui.Typography>
    <Mui.Typography sx={{ textAlign: "justify" }}>{content}</Mui.Typography>
  </Mui.Card>
);

export declare namespace infoCard {
  export interface Props {
    image: string;
    title: string;
    content: string;
  }
}
