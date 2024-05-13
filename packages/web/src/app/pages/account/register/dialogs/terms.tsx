import * as Mui from "@mui/material";
import * as Components from "src/app/components";
import * as Pages from "src/app/pages";

export const Terms = () => {
  return (
    <Components.Global.Dialog icon maxWidth="lg">
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
        <Mui.Stack sx={{ overflow: "auto" }}>
          <div dangerouslySetInnerHTML={{ __html: Pages.Company.htmlInput }} />
        </Mui.Stack>
      </Components.Global.Container>
    </Components.Global.Dialog>
  );
};
