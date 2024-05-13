import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Log = () => {
  const { id } = Router.useParams();
  const { detail, loading } = Hooks.User.useCryptoDetail(id as string);
  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Components.Global.Dialog fullScreen={false} icon maxWidth="sm">
      <Mui.CardContent sx={{ minWidth: 250 }}>
        <Mui.Typography variant="h6" fontWeight={800}>
          Order Details
        </Mui.Typography>
        <Mui.Typography
          variant="body2"
          component="pre"
          sx={{
            m: 1,
            p: 2,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[100]
                : theme.palette.grey[200],
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          {JSON.stringify(detail?.orderDetails?.[0] || {}, null, 2).replaceAll(
            /[\{\}\,\"]/g,
            ""
          )}
        </Mui.Typography>
      </Mui.CardContent>
    </Components.Global.Dialog>
  );
};
