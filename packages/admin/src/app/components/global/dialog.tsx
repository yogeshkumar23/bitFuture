import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => (
    <Mui.Slide direction="up" ref={ref} {...props} mountOnEnter unmountOnExit />
  )
);

export const Dialog = ({
  children,
  icon,
  ...props
}: Partial<Mui.DialogProps> & { icon?: boolean }) => {
  const [open, setOpen] = React.useState(true);
  const isMobile = Mui.useMediaQuery(Mui.useTheme().breakpoints.down("md"));
  const navigate = Router.useNavigate();
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 500);
  };
  return (
    <Mui.Dialog
      fullScreen={isMobile}
      maxWidth="sm"
      TransitionComponent={Transition}
      transitionDuration={500}
      onClose={handleClose}
      open={open}
      {...props}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "#000000ea",
        },
        "& .MuiDialog-paperScrollPaper": {
          borderRadius: { xs: props.fullScreen === false ? 5 : 0, md: 5 },
          bgcolor: "background.default",
        },
      }}
    >
      <Mui.Stack sx={{ display: icon ? "flex" : "none" }}>
        <Mui.IconButton
          size="large"
          sx={{ alignSelf: "flex-end", m: 0, mb: -5, zIndex: 999 }}
          onClick={(props.onClose as any) || handleClose}
        >
          <MuiIcons.Close
            fontSize="inherit"
            sx={{ fill: (theme) => theme.palette.grey[500] }}
          />
        </Mui.IconButton>
      </Mui.Stack>
      {children}
    </Mui.Dialog>
  );
};
