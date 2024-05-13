import * as Draft from "draft-js";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as React from "react";
import * as ReactEditor from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TimeAgo from "react-timeago";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Hooks from "src/app/hooks";

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
        id="notificationCard"
        open={view}
        onClose={handleView}
        component={view ? Components.Global.Dialog : Mui.CardActionArea}
        onClick={text || view ? undefined : handleView}
        maxWidth="sm"
        fullScreen={false}
        icon={true}
        sx={{
          minWidth: "100%",
          p: view ? 0 : 2,
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          mt: view ? 0 : 1,
        }}
      >
        <Mui.Grid container component={view ? Mui.DialogContent : Mui.Grid}>
          <Mui.Grid item xs={1} md={1} sx={{ display: view ? "none" : "flex" }}>
            <Mui.IconButton disableRipple id="indicator">
              <MuiIcons.Lens
                sx={{
                  fontSize: 10,
                  color: is_Read ? "success.light" : "primary.main",
                }}
              />
            </Mui.IconButton>
          </Mui.Grid>
          <Mui.Grid item xs={view ? 12 : 11} md={view ? 12 : 11}>
            <Mui.Stack spacing={view ? 2 : 0}>
              <Mui.Typography
                variant={view ? "h5" : "body2"}
                sx={{ fontWeight: 800 }}
                noWrap
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
                      variant={view ? "caption" : "body2"}
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
  id,
  ...props
}: generalNotification & { ctext?: boolean }) => {
  const { user } = React.useContext(Contexts.UserContext);
  const { update } = Hooks.Firebase.useFirestore(true);
  const [view, setView] = React.useState(false);

  const handleView = () => {
    setView(!view);
    if (view) {
      update(`general_notifications`, id as string, {
        [user?.uid || ""]: true,
      });
    }
  };

  const content = props?.text
    ? Draft.convertFromRaw(JSON.parse(props?.text))
    : undefined;

  const editorState = content
    ? Draft.EditorState.createWithContent(content)
    : undefined;

  return (
    <Mui.Card
      id="notificationCard"
      open={view}
      onClose={handleView}
      component={view ? Components.Global.Dialog : Mui.CardActionArea}
      onClick={ctext || view ? undefined : handleView}
      maxWidth="sm"
      fullScreen={true}
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
        spacing={2}
        sx={{ p: { xs: 1, sm: view ? 10 : 1 } }}
      >
        <Mui.Grid item xs={1} md={1} sx={{ display: view ? "none" : "flex" }}>
          <Mui.IconButton disableRipple>
            <MuiIcons.Lens
              sx={{
                fontSize: 10,
                color: props.is_Read ? "success.light" : "primary.main",
              }}
            />
          </Mui.IconButton>
        </Mui.Grid>
        {props.image && (
          <Mui.Grid
            item
            xs={11}
            md={ctext ? 3 : 1}
            sx={{
              display: view ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Mui.CardMedia
              component="img"
              src={props.image}
              sx={{
                borderRadius: 2,
                height: { xs: 150, sm: 75 },
                width: { xs: 150, sm: 75 },
                objectFit: view ? "contain" : "cover",
              }}
            />
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} md={view ? 12 : ctext ? 8 : 10}>
          <Mui.Stack
            spacing={1}
            sx={{
              "& .public-DraftEditor-content span": {
                bgcolor: "transparent !important",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#f4f4f4" : undefined,
              },
            }}
          >
            {props.image && !props.minimum && view && (
              <Mui.CardMedia
                component="img"
                src={props.image}
                sx={{ borderRadius: 2, height: 300, objectFit: "contain" }}
              />
            )}
            <Mui.Typography variant="body1" fontWeight="700" noWrap>
              {props.title}
            </Mui.Typography>
            <Mui.Stack
              spacing={0.5}
              // alignItems="center"
              direction={{ xs: "column", sm: "row" }}
            >
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
              <Mui.Stack
                direction="row"
                spacing={1}
                my={2}
                sx={{ display: ctext ? "none" : "flex" }}
              >
                {props.tags?.split(",")?.map((tag, index) => (
                  <Mui.Chip
                    key={index}
                    label={`#${tag.trim()}`}
                    size="small"
                    color="primary"
                  />
                ))}
              </Mui.Stack>
            </Mui.Stack>
            {!props.minimum && view && (
              <ReactEditor.Editor
                editorState={editorState}
                toolbarHidden
                readOnly
              />
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
