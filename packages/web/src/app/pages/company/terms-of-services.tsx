import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";

export const htmlInput = ``;

export default () => {
  const navigate = Router.useNavigate();
  const back = () => navigate(-1);
  return (
    <Mui.Container
      sx={{
        width: "100%",
        px: { xs: 0, sm: 0 },
        "& p,span,li": {
          color: (theme) =>
            theme.palette.mode === "dark" ? "#fff !important" : undefined,
        },
      }}
    >
      <Mui.IconButton onClick={back}>
        <MuiIcons.ArrowBack color="primary" />
      </Mui.IconButton>
      <Components.Global.Container
        direction="column"
        maxWidth="lg"
        elevation={3}
      >
        <Mui.Divider sx={{ width: "100%" }}>
          <Mui.Typography
            variant="h5"
            fontWeight={900}
            textAlign="center"
            textTransform="capitalize"
            sx={{ width: "100%" }}
          >
            Terms Of Use
          </Mui.Typography>
        </Mui.Divider>
        <div dangerouslySetInnerHTML={{ __html: htmlInput }} />
      </Components.Global.Container>
    </Mui.Container>
  );
};
