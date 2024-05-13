import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import React from "react";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";
import * as Query from "react-query";

export const EditStatus = () => {
  const queryClient = Query.useQueryClient();
  const handler = Providers.useCustomHandler;
  const navigate = Router.useNavigate();
  const [next, setNext] = React.useState(false);
  const { state } = Router.useLocation() as {
    state: Hooks.Admin.GetTradeError.allOrder;
  };
  const handleNext = () => setNext(!next);
  const Submit = async ({
    status,
  }: {
    status: "failed" | "success" | "received" | "pending";
  }) => {
    await Api.Server.Request("updateTradeErrorOrders", {
      teoId: state?.teoId,
      status,
    })
      .then((res) => {
        handler({
          message: res?.message,
          variant: res?.error ? "error" : "success",
        });
        queryClient.invalidateQueries("getAllTradeErrors");
        navigate("..");
      })
      .catch((e) => {
        handler({
          message: "Somthing went wrong",
          variant: "error",
        });
      });
  };
  return state ? (
    <Components.Global.Dialog icon>
      <Mui.Stack spacing={2} component={Mui.DialogContent} alignItems="center">
        <Formik.Formik initialValues={{ status: "success" }} onSubmit={Submit}>
          {({ values }) => (
            <Mui.Stack
              component={Formik.Form}
              alignItems="center"
              spacing={2}
              sx={{ width: 300 }}
            >
              {next ? (
                <>
                  <Mui.Typography
                    variant="h6"
                    textTransform="capitalize"
                    textAlign="center"
                  >
                    Are you sure you want to change pending status to{" "}
                    <Mui.Typography
                      color={
                        {
                          received: "success.main",
                          success: "success.main",
                          failed: "error.main",
                          pending: "wanring.main",
                        }[values.status]
                      }
                      variant="h6"
                      textTransform="capitalize"
                    >
                      {values.status}?
                    </Mui.Typography>{" "}
                  </Mui.Typography>

                  <Mui.Typography variant="body1">
                    {state?.firstName} {state?.lastName} ({state?.email})
                  </Mui.Typography>
                  <Mui.Alert severity="info">
                    <Mui.Typography variant="body2">
                      For failed status update , amount will be reverted back to
                      user wallet
                    </Mui.Typography>
                  </Mui.Alert>
                  <Mui.Stack
                    direction="row"
                    justifyContent="center"
                    component={Mui.DialogActions}
                  >
                    <Components.Form.SubmitButton
                      type="submit"
                      variant="contained"
                      sx={{ marginTop: 2 }}
                    >
                      Confirm
                    </Components.Form.SubmitButton>
                    <Mui.Button
                      variant="outlined"
                      sx={{ marginTop: 2, ml: 2 }}
                      onClick={handleNext}
                    >
                      Cancel
                    </Mui.Button>
                  </Mui.Stack>
                </>
              ) : (
                <>
                  <Mui.Typography variant="h5" align="center">
                    Edit Order Status
                  </Mui.Typography>
                  <Mui.Typography variant="h6" textTransform="capitalize">
                    {state?.firstName} {state?.lastName}
                  </Mui.Typography>
                  <Mui.Typography variant="body2">
                    {state?.email}
                  </Mui.Typography>
                  <Components.Form.SelectField
                    size="small"
                    label="Transaction Status"
                    name="status"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {["success", "failed"].map((item, index) => (
                      <Mui.MenuItem
                        value={item}
                        key={index}
                        disabled={state?.status === item}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {item}
                      </Mui.MenuItem>
                    ))}
                  </Components.Form.SelectField>
                  <Mui.Stack
                    direction="row"
                    justifyContent="center"
                    component={Mui.DialogActions}
                  >
                    <Mui.Button
                      type="submit"
                      variant="contained"
                      sx={{ marginTop: 2 }}
                      onClick={handleNext}
                    >
                      Update Status
                    </Mui.Button>
                    {/* <Components.Form.SubmitButton
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Update Status
                </Components.Form.SubmitButton> */}
                    <Mui.Button
                      component={Router.Link}
                      to="../"
                      variant="outlined"
                      sx={{ marginTop: 2, ml: 2 }}
                    >
                      Cancel
                    </Mui.Button>
                  </Mui.Stack>
                </>
              )}
            </Mui.Stack>
          )}
        </Formik.Formik>
      </Mui.Stack>
    </Components.Global.Dialog>
  ) : (
    <Router.Navigate to=".." />
  );
};
