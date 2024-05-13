import * as Mui from "@mui/material";
import React from "react";
import * as ReactQuery from "react-query";
import * as Router from "react-router-dom";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Constant from "src/constants";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const EditRights = () => {
  const navigate = Router.useNavigate();
  const handler = Providers.useCustomHandler;
  const queryClient = ReactQuery.useQueryClient();
  const { state } = Router.useLocation() as { state: Hooks.User.UseUser.User };
  const [error, setError] = React.useState(false);
  const { permissions, loading } = Hooks.User.useAdminRights(
    state?.uid as string
  );
  const availablePages = Constant.RIGHTS.filter(
    (permission) => permission !== "Admins"
  ).map((permission) =>
    permission.toLowerCase().replace(" ", "_").replace("/", "_")
  );

  const restrictedPages = React.useMemo(
    () =>
      (permissions?.length || 0) > 0
        ? availablePages.filter((page) => !permissions?.includes(page))
        : [],
    [permissions, availablePages, loading]
  );

  const defaultOptions = React.useMemo(
    () =>
      (permissions?.length || 0) > 0
        ? restrictedPages.length < 1
          ? ["All"]
          : Constant.RIGHTS.filter((permission) =>
              permissions?.includes(
                permission.toLowerCase().replace(" ", "_").replace("/", "_")
              )
            )
        : [],
    [permissions, restrictedPages, loading]
  );

  const [access, setAccess] = React.useState<string[]>(defaultOptions);

  const handleAccessChange = (event: Mui.SelectChangeEvent<typeof access>) => {
    const value = event.target.value;
    setError(value && value.length > 0 ? false : true);
    const accessList = typeof value === "string" ? value.split(",") : value;
    setAccess(accessList.includes("All") ? ["All"] : accessList);
  };

  const handleRequest = async (props: handleRequestProps) => {
    await Api.Server.Request("updateAdminRights", {
      uid: state?.uid,
      type: "PAGE",
      typeName: props.permissions.join(","),
      permission: props.access,
    })
      .then((res) => {
        if (res?.error) {
          handler({
            message: res.message,
            variant: "error",
          });
        } else {
          handler({
            message: res.message,
            variant: "success",
          });
        }
        navigate("..");
      })
      .catch((e) => {
        handler({
          message: e.message,
          variant: "error",
        });
      });
    queryClient.invalidateQueries("adminList");
    queryClient.invalidateQueries(`adminRights${state?.uid}`);
  };

  const submit = async () => {
    if (!access || access.length < 1) {
      setError(true);
      return;
    }

    if (access.includes("All")) {
      handleRequest({
        access: true,
        permissions: availablePages.map((permission) =>
          permission.toLowerCase().replace(" ", "_").replace("/", "_")
        ),
      });
      return;
    }

    let allowedRights: string[] = [];
    let revokedRights: string[] = [];

    Constant.RIGHTS.filter((permission) => permission !== "Admins").forEach(
      (permission) => {
        if (access.includes(permission))
          allowedRights.push(
            permission.toLowerCase().replace(" ", "_").replace("/", "_")
          );
        else
          revokedRights.push(
            permission.toLowerCase().replace(" ", "_").replace("/", "_")
          );
      }
    );
    handleRequest({
      access: true,
      permissions: allowedRights,
    });

    handleRequest({
      access: false,
      permissions: revokedRights,
    });
  };

  React.useEffect(() => {
    setAccess(defaultOptions);
  }, [JSON.stringify(defaultOptions)]);

  return (
    <Components.Global.Dialog open={true} fullScreen={false} icon>
      <Mui.Stack component={Mui.DialogTitle}>
        <Mui.Typography variant="h5" align="center">
          Edit rights for {state?.firstName} {state?.lastName}
        </Mui.Typography>
      </Mui.Stack>
      <Mui.Stack component={Mui.DialogContent}>
        <Mui.Stack spacing={1}>
          <Mui.Typography component={Mui.FormLabel}>Email</Mui.Typography>
          <Mui.TextField
            size="small"
            placeholder="Email"
            value={state?.email}
            disabled
            fullWidth
          />
        </Mui.Stack>
        <Mui.Stack spacing={1} sx={{ mt: 2 }}>
          <Mui.Typography
            component={Mui.FormLabel}
            color={error ? "error.light" : ""}
          >
            Select Rights
          </Mui.Typography>
          <Mui.FormControl fullWidth>
            <Mui.Select
              name="allowedRights"
              multiple
              value={access}
              error={error}
              size="small"
              onChange={handleAccessChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <Mui.MenuItem value="All">
                <Mui.Checkbox size="small" checked={access.includes("All")} />
                <Mui.Typography variant="body1">All</Mui.Typography>
              </Mui.MenuItem>
              {Constant.RIGHTS.filter(
                (permission) => permission !== "Admins"
              ).map((permission, index) => (
                <Mui.MenuItem value={permission} key={index}>
                  <Mui.Checkbox
                    size="small"
                    checked={access.includes(permission)}
                  />
                  <Mui.Typography variant="body1">{permission}</Mui.Typography>
                </Mui.MenuItem>
              ))}
            </Mui.Select>
          </Mui.FormControl>
          {error ? (
            <Mui.Typography component={Mui.FormLabel} color="error.light">
              No Rights Selected
            </Mui.Typography>
          ) : null}
        </Mui.Stack>
      </Mui.Stack>
      <Mui.Stack
        component={Mui.DialogActions}
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ p: 2 }}
      >
        <Mui.Button variant="contained" onClick={submit}>
          Submit
        </Mui.Button>
        <Mui.Button variant="outlined" onClick={() => navigate("..")}>
          Cancel
        </Mui.Button>
      </Mui.Stack>
    </Components.Global.Dialog>
  );
};

interface handleRequestProps {
  permissions: string[];
  access: boolean;
}
