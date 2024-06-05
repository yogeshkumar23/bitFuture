import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Constants from "src/constants";

export const SideBar = ({
  permissions,
  open,
}: {
  permissions: string[];
  open: boolean;
}) => {
  const [menus, setMenus] = React.useState<Record<string, boolean>>({});
  const { pathname } = Router.useLocation();

  const handleClick = (menu: string) =>
    setMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

  React.useEffect(() => {
    if (permissions?.length) {
      setMenus(
        Object.assign(
          {},
          ...permissions.map((menu, index) => ({
            [menu]: !Boolean(index),
          }))
        )
      );
    }
  }, [permissions?.length]);

  return (
    <Mui.List>
      {[
        "Dashboard",
        ...Constants.RIGHTS.filter((permission) =>
          permissions?.includes(
            permission.toLowerCase().replace(" ", "_").replace("/", "_")
          )
        ),
      ].map((text, index) => {
        const path = pathname.includes(
          text.toLowerCase().replace(" ", "_").replace("/", "_")
        );
        return (
          <>
            <Mui.ListItem
              component={
                Boolean(Constants.RIGHTSMENUS[text]) ? Mui.Button : Router.Link
              }
              to={`${Constants.API_CONFIG.base}${text
                .toLowerCase()
                .replace(" ", "_")
                .replace("/", "_")}`}
              onClick={() =>
                Boolean(Constants.RIGHTSMENUS[text])
                  ? handleClick(text)
                  : undefined
              }
              key={index}
              sx={
                path
                  ? {
                      color: "primary.main",
                      borderRadius: 0,
                      fontWeight: "bolder",
                      boxShadow: (theme) =>
                        `-2rem 0px 2rem -1rem ${theme.palette.primary.main} inset`,
                      mt: -0.5,
                      whiteSpace: "nowrap",
                    }
                  : { color: "text.secondary", whiteSpace: "nowrap" }
              }
            >
              <Mui.ListItemIcon
                title={text}
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                {
                  {
                    Dashboard: (
                      <MuiIcons.Dashboard
                        color={path ? "primary" : undefined}
                      />
                    ),
                    "General Updates": (
                      <MuiIcons.Campaign color={path ? "primary" : undefined} />
                    ),
                    Users: (
                      <MuiIcons.Group color={path ? "primary" : undefined} />
                    ),
                    Admins: (
                      <MuiIcons.SupervisorAccount
                        color={path ? "primary" : undefined}
                      />
                    ),
                    Spot: (
                      <MuiIcons.CurrencyBitcoin
                        color={path ? "primary" : undefined}
                      />
                    ),
                    P2P: (
                      <MuiIcons.Payment color={path ? "primary" : undefined} />
                    ),
                    NFT: (
                      <MuiIcons.Collections
                        color={path ? "primary" : undefined}
                      />
                    ),
                    Transactions: (
                      <MuiIcons.Payments color={path ? "primary" : undefined} />
                    ),
                    KYC: (
                      <MuiIcons.Badge color={path ? "primary" : undefined} />
                    ),
                    Referrals: (
                      <MuiIcons.Share color={path ? "primary" : undefined} />
                    ),
                    Tickets: (
                      <MuiIcons.SupportAgent
                        color={path ? "primary" : undefined}
                      />
                    ),
                    Wallet: (
                      <MuiIcons.AccountBalance
                        color={path ? "primary" : undefined}
                      />
                    ),
                  }[text]
                }
              </Mui.ListItemIcon>
              <Mui.ListItemText
                primary={
                  <Mui.Stack direction="row" justifyContent="space-between">
                    {text}
                    {Boolean(Constants.RIGHTSMENUS[text]) &&
                      (menus[text] ? (
                        <MuiIcons.ExpandLess />
                      ) : (
                        <MuiIcons.ExpandMore />
                      ))}
                  </Mui.Stack>
                }
                sx={{
                  opacity: open ? 1 : 0,
                  color: path ? "primary.main" : undefined,
                }}
              />
            </Mui.ListItem>
            {Boolean(Constants.RIGHTSMENUS[text]) && menus[text] && (
              <Mui.List sx={{ pl: 0 }}>
                {Constants.RIGHTSMENUS[text].map((subtext, subindex) => {
                  const subpath = pathname.includes(
                    subtext.toLowerCase().replace(" ", "_").replace("/", "_")
                  );
                  return (
                    <Mui.ListItem
                      button
                      component={Router.Link}
                      to={`${Constants.API_CONFIG.base}${text
                        .toLowerCase()
                        .replace(" ", "_")
                        .replace("/", "_")}/${subtext
                        .toLowerCase()
                        .replace(" ", "_")
                        .replace("/", "_")}`}
                      key={subindex}
                      sx={
                        subpath
                          ? {
                              color: "primary.main",
                              borderRadius: 0,
                              fontWeight: "bolder",
                              boxShadow: (theme) =>
                                `-2rem 0px 2rem -1rem ${theme.palette.primary.main} inset`,
                              mt: -0.5,
                            }
                          : { color: "text.secondary" }
                      }
                    >
                      <Mui.ListItemIcon
                        title={subtext}
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {
                          {
                            Pairs: (
                              <MuiIcons.CurrencyBitcoin
                                color={path ? "primary" : undefined}
                              />
                            ),
                            "Trade History": (
                              <MuiIcons.ManageHistory
                                color={path ? "primary" : undefined}
                              />
                            ),
                            "Order History": (
                              <MuiIcons.History
                                color={path ? "primary" : undefined}
                              />
                            ),
                            "Order Errors": (
                              <MuiIcons.RunningWithErrors
                                color={path ? "primary" : undefined}
                              />
                            ),
                            "Admin Revenues": (
                              <MuiIcons.AttachMoney
                                color={path ? "primary" : undefined}
                              />
                            ),
                            Disputes: (
                              <MuiIcons.Sms
                                color={path ? "primary" : undefined}
                              />
                            ),
                            Details: (
                              <MuiIcons.Info
                                color={path ? "primary" : undefined}
                              />
                            ),
                            Balance: (
                              <MuiIcons.AccountBalance
                                color={path ? "primary" : undefined}
                              />
                            ),
                            "Deposit/Withdraw": (
                              <MuiIcons.History
                                color={path ? "primary" : undefined}
                              />
                            ),
                            Pay: (
                              <MuiIcons.History
                                color={path ? "primary" : undefined}
                              />
                            ),
                          }[subtext]
                        }
                      </Mui.ListItemIcon>
                      <Mui.ListItemText
                        primary={
                          <Mui.Stack
                            direction="row"
                            justifyContent="space-between"
                          >
                            {subtext}
                          </Mui.Stack>
                        }
                        sx={{
                          opacity: open ? 1 : 0,
                          color: path ? "primary.main" : undefined,
                        }}
                      />
                    </Mui.ListItem>
                  );
                })}
              </Mui.List>
            )}
          </>
        );
      })}
    </Mui.List>
  );
};
