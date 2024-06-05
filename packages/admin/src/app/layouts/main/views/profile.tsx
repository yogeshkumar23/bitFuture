import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import React from "react";
import * as Assets from "src/assets";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";

export const Profile = ({
  click,
  check,
  trigger,
}: {
  click?: boolean;
  check: boolean;
  trigger: boolean;
}) => {
  const user = React.useContext(Contexts.UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Mui.IconButton
        disableTouchRipple
        disableRipple
        size="small"
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          click && setAnchorEl(event.currentTarget)
        }
      >
        <Mui.Avatar
          sx={{ height: 35, width: 35 }}
          src={
            user?.profileImage
              ? `${import.meta.env.VITE_API_ENCRYPTION}://${
                  import.meta.env.VITE_API_IP
                }${import.meta.env.VITE_ASSETS_PATH}${user?.profileImage}`
              : `https://avatars.dicebear.com/api/initials/${user?.firstName}_${user?.lastName}.svg`
          }
        />
        <MuiIcons.ArrowDropDown
          sx={{
            display: { xs: "none", md: "block" },
            color: !trigger && check ? "#fff" : undefined,
          }}
          fontSize="small"
        />
      </Mui.IconButton>
      <Mui.Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        sx={{
          display: anchorEl ? "block" : "none",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: "background.default",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            borderRadius: (theme) => theme.spacing(1),
            marginTop: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              marginLeft: -0.5,
              marginRight: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.default",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Mui.MenuItem component={Router.Link} to="profile">
          <Mui.ListItemIcon>
            <Mui.CardMedia
              src={Assets.Account}
              component="img"
              sx={{
                width: 18,
                height: 18,
                objectFit: "contain",
              }}
            />
          </Mui.ListItemIcon>
          {`${user?.firstName} ${user?.lastName}`}
        </Mui.MenuItem>
        <Mui.MenuItem onClick={handleOpen}>
          <Mui.ListItemIcon>
            <Mui.CardMedia
              src={Assets.MenuLogout}
              component="img"
              sx={{
                width: 18,
                height: 18,
                objectFit: "contain",
              }}
            />
          </Mui.ListItemIcon>
          <Mui.Typography variant="body2" color="error">
            Logout
          </Mui.Typography>
        </Mui.MenuItem>
      </Mui.Menu>
      <Pages.Account.Dialogs.Logout open={open} close={handleClose} />
    </>
  );
};
