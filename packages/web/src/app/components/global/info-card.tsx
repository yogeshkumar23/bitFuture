import * as Mui from "@mui/material";

export const InfoCard = ({
  image,
  title,
  content,
  imageBackground = false,
}: infoCard.Props) => (
  <Mui.Card
    component={Mui.Stack}
    alignItems="center"
    sx={{
      p: 4,
      borderRadius: 5,
      minHeight: 300,
      width: "fit-content",
      maxWidth: 450,
      mx: "20px !important",
      boxShadow: (theme) => `0px 20px 25px -30px ${theme.palette.text.primary}`,
      "&:hover": {
        bgcolor: (theme) =>
          imageBackground ? `${theme.palette.primary.main}30` : undefined,
      },
    }}
  >
    <Mui.Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        background: imageBackground ? "#fff" : undefined,
        p: 2,
        borderRadius: "100%",
        width: 75,
        heigth: 75,
        boxShadow: imageBackground
          ? `0 0 5px ${Mui.colors.grey[400]}`
          : undefined,
      }}
    >
      <Mui.CardMedia
        component="img"
        src={image}
        sx={imageBackground ? { width: 40, heigth: 40 } : { width: 80 }}
      />
    </Mui.Stack>
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
    imageBackground?: boolean;
  }
}
