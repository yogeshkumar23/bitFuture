import * as Draft from "draft-js";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as Router from "react-router-dom";
import * as ReactEditor from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TimeAgo from "react-timeago";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const Notification = ({
  text = false,
  uid,
  id,
  ipAddress,
  attributes,
  createdTime,
  message,
  topic,
  title,
  is_Read,
}: notification & { text?: boolean; uid: string }) => {
  const { update } = Hooks.Firebase.useFirestore(true);
  const [view, setView] = React.useState(false);
  const handleView = () => {
    setView(!view);
    if (view) {
      update(`users/${uid}/notifications`, id as string, { is_Read: true });
    }
  };
  return (
    <>
      <Mui.Card
        open={view}
        onClose={handleView}
        component={view ? Components.Global.Dialog : Mui.CardActionArea}
        onClick={text || view ? undefined : handleView}
        maxWidth="sm"
        fullScreen={false}
        icon={true}
        id={id}
        sx={{
          minWidth: "100%",
          p: view ? 0 : 2,
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          mt: view ? 0 : 1,
        }}
      >
        <Mui.Grid container component={view ? Mui.DialogContent : Mui.Grid}>
          <Mui.Grid item xs={2} md={1} sx={{ display: view ? "none" : "flex" }}>
            <Mui.IconButton disableRipple>
              <MuiIcons.Lens
                sx={{
                  fontSize: 10,
                  color: is_Read ? "success.light" : "primary.main",
                }}
              />
            </Mui.IconButton>
          </Mui.Grid>
          <Mui.Grid item xs={view ? 12 : 10} md={view ? 12 : 11}>
            <Mui.Stack spacing={view ? 2 : 0}>
              <Mui.Typography
                variant={view ? "h5" : "body2"}
                sx={{ fontWeight: 800 }}
              >
                {
                  {
                    trade: "Trade Notification",
                    login: "New Device Login",
                    general: "General Notifications",
                  }[topic]
                }
              </Mui.Typography>
              <Mui.Stack sx={{ overflowX: "hidden" }}>
                {text ? (
                  <Mui.Typography
                    variant={view ? "body1" : "body2"}
                    justifyContent="center"
                    noWrap
                  >
                    {`${
                      {
                        login: ipAddress,
                        trade: `${
                          attributes?.coin ||
                          attributes?.coinId?.split("/")?.[0]
                        } Coin and ${
                          attributes?.currency ||
                          attributes?.coinId?.split("/")?.[1]
                        } pair ${attributes?.tradeId}`,
                        general: `${title} :`,
                      }[topic]
                    } ${message}`}
                  </Mui.Typography>
                ) : (
                  <>
                    <Mui.Typography
                      variant="body2"
                      justifyContent="center"
                      noWrap={!view}
                    >
                      {`${
                        {
                          login: ipAddress,
                          trade: `${
                            attributes?.coin ||
                            attributes?.coinId?.split("/")?.[0]
                          } Coin and ${
                            attributes?.currency ||
                            attributes?.coinId?.split("/")?.[1]
                          } pair ${attributes?.tradeId}`,
                          general: `${title} :`,
                        }[topic]
                      } ${message}`}
                    </Mui.Typography>
                  </>
                )}
                {view && attributes ? (
                  <Mui.Typography
                    variant="caption"
                    component="pre"
                    sx={{
                      m: { sm: 1 },
                      p: { xs: 1, sm: 2 },
                      borderRadius: 2,
                      backgroundColor: (theme) => theme.palette.grey[100],
                    }}
                  >
                    {JSON.stringify(attributes, null, 2).replaceAll(
                      /[\{\}\,\"]/g,
                      ""
                    )}
                  </Mui.Typography>
                ) : null}
                <Mui.Typography
                  variant="body2"
                  textAlign="right"
                  sx={{ pt: view ? 2 : 0 }}
                >
                  {view ? (
                    Components.Global.timeFn(createdTime as unknown as string)
                  ) : (
                    <TimeAgo date={createdTime} />
                  )}
                </Mui.Typography>
              </Mui.Stack>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Card>
    </>
  );
};

export const General = ({
  ctext = false,
  ...props
}: generalNotification & { ctext?: boolean }) => {
  const navigate = Router.useNavigate();
  const handler = Providers.useCustomHandler;
  const [view, setView] = React.useState(props?.preview || false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = React.useContext(Contexts.UserContext);
  const { update } = Hooks.Firebase.useFirestore(true);
  const { deleteDoc } = Hooks.Firebase.useFirestore(true);

  const handleView = () => {
    props?.preview ? navigate("..") : setView(!view);
    if (view) {
      update(`general_notifications`, props.id as string, {
        [user?.uid || ""]: true,
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    deleteDoc("general_notifications", props?.id as string).then(() =>
      handler({
        message: "General Update deleted successfully",
        variant: "success",
      })
    );
    handleView();
  };

  const content = props?.text
    ? Draft.convertFromRaw(JSON.parse(props?.text))
    : undefined;

  const editorState = content
    ? Draft.EditorState.createWithContent(content)
    : undefined;

  return (
    <Mui.Card
      open={view}
      onClose={handleView}
      component={view ? Components.Global.Dialog : Mui.CardActionArea}
      onClick={ctext || view ? undefined : handleView}
      maxWidth="sm"
      fullScreen={true}
      id={props.id}
      icon={view}
      sx={{
        p: view ? 0 : 1,
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        mt: view ? 0 : 1,
      }}
    >
      <Mui.Grid
        container
        component={view ? Mui.DialogContent : Mui.Grid}
        sx={{ p: { xs: 2, sm: view ? 10 : 1 } }}
      >
        <Mui.Grid
          item
          xs={2}
          md={1}
          sx={{
            display: view ? "none" : "flex",
          }}
        >
          <Mui.IconButton disableRipple>
            <MuiIcons.Lens
              sx={{
                fontSize: 10,
                color: props.is_Read ? "success.light" : "primary.main",
              }}
            />
          </Mui.IconButton>
        </Mui.Grid>
        <Mui.Grid item xs={view ? 12 : 10} md={view ? 12 : 11}>
          <Mui.Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Mui.Typography variant="h6">{props.title}</Mui.Typography>
            <Mui.Box flexGrow={1} />
            {view && (
              <Mui.IconButton
                id="more-button"
                aria-controls={open ? "more-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                disabled={props.preview}
              >
                <MuiIcons.MoreHoriz />
              </Mui.IconButton>
            )}

            <Mui.Menu
              id="more-menu"
              anchorEl={anchorEl}
              open={open}
              onClick={handleClose}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "more-button",
              }}
            >
              {/* <Mui.MenuItem>Edit</Mui.MenuItem> */}
              <Mui.MenuItem onClick={handleDelete}>Delete</Mui.MenuItem>
            </Mui.Menu>
          </Mui.Stack>
          <Mui.Stack
            sx={{
              "& .public-DraftEditor-content span": {
                bgcolor: "transparent !important",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#f4f4f4" : undefined,
              },
            }}
          >
            <Mui.Stack spacing={1} direction={{ xs: "column", md: "row" }}>
              {props.author && (
                <Mui.Chip
                  label={`Author: ${props.author}`}
                  color="primary"
                  size="small"
                />
              )}
              {props.category && (
                <Mui.Chip
                  label={`Category: ${props.category}`}
                  color="primary"
                  size="small"
                />
              )}
              <Mui.Stack direction="row" spacing={1} my={2}>
                {props.tags?.split(",")?.map((tag, index) => (
                  <Mui.Chip
                    key={index}
                    label={`#${tag.trim()}`}
                    color="primary"
                    size="small"
                  />
                ))}
              </Mui.Stack>
            </Mui.Stack>
            {!props.minimum && view && (
              <>
                <ReactEditor.Editor
                  editorState={editorState}
                  toolbarHidden
                  readOnly
                />

                {props.image && (
                  <Mui.CardMedia
                    component="img"
                    src={props.image}
                    sx={{ borderRadius: 2, maxHeight: 600, objectFit: "contain" }}
                  />
                )}
              </>
            )}
          </Mui.Stack>
          <Mui.Typography
            variant="body2"
            textAlign="right"
            sx={{ pt: view ? 2 : 0 }}
          >
            {view ? (
              Components.Global.timeFn(props.createdTime as unknown as string)
            ) : (
              <TimeAgo date={props.createdTime} />
            )}
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Card>
  );
};
