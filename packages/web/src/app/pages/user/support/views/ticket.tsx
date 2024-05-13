import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";

export const Ticket = ({
  id,
  createdTime,
  status,
  subject,
  message,
}: tickets) => {
  const navigate = Router.useNavigate();
  const { pathname } = Router.useLocation();
  const handleClick = () =>
    navigate(`view/${id}`, { state: { subject, message, status } });
  return (
    <Mui.Card
      component={Mui.CardActionArea}
      sx={{
        p: 2,
        bgcolor: (theme) => theme.palette.grey[100],
        cursor: "pointer",
        border: pathname.includes(id as string)
          ? (theme) => `1px solid ${theme.palette.primary.main}`
          : (theme) => `1px solid ${theme.palette.grey[200]}`,
        minHeight: 100,
      }}
      key={id}
      onClick={handleClick}
    >
      <Mui.Stack
        direction="row"
        sx={{ mb: 0.2, alignItems: "center", justifyContent: "space-between" }}
      >
        <Mui.Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.grey[400] }}
        >
          {Components.Global.timeFn(createdTime as unknown as string)}
        </Mui.Typography>
        <Mui.Stack direction="row">
          <MuiIcons.FiberManualRecord
            color={status === "pending" ? "error" : "success"}
            sx={{ width: 8, mx: 0.5 }}
          />
          <Mui.Typography
            color={status === "pending" ? "error.light" : "success.light"}
            variant="body2"
          >
            {status}
          </Mui.Typography>
        </Mui.Stack>
      </Mui.Stack>
      <Mui.Typography variant="body1" sx={{ fontWeight: 800 }}>
        {subject}
      </Mui.Typography>
      <Mui.Typography variant="body2" noWrap>
        {message}
      </Mui.Typography>
    </Mui.Card>
  );
};
