import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Components from "src/app/components";

export const PaymentDetails = ({
  payment,
  accountHolderName,
}: {
  payment: paymentDetails | undefined;
  accountHolderName: string | undefined;
}) => (
  <Mui.Stack spacing={2} component={Mui.CardContent}>
    <Mui.Typography variant="h6">Payment Details</Mui.Typography>
    <Mui.Divider />
    <Components.Global.StackLabel
      direction="row"
      medium
      title="Account holder name"
      label={
        <Mui.Typography variant="inherit" textTransform="capitalize">
          {accountHolderName}
        </Mui.Typography>
      }
      node
    />
    {payment &&
      Object.entries(payment).map(
        ([key, value]) =>
          value && (
            <>
              <Mui.Typography variant="body1" fontWeight="bold">
                {key.replaceAll("_", " ")}
              </Mui.Typography>
              {Object.entries(value)
                .filter(([_, value1]) => Boolean(value1))
                .map(([key1, value1]) => (
                  <Components.Global.StackLabel
                    direction="row"
                    medium
                    title={
                      <Mui.Typography
                        variant="inherit"
                        textTransform="capitalize"
                      >
                        {key1
                          ?.split("$")?.[1]
                          ?.replaceAll("_", " ")
                          ?.replace("-", " : ")}
                      </Mui.Typography>
                    }
                    label={value1 as string}
                    node
                  />
                ))}
            </>
          )
      )}
    <Mui.Alert variant="standard" color="warning">
      <Mui.AlertTitle>Note:</Mui.AlertTitle>
      <Mui.List dense>
        {[
          "Make sure you adhere to trade terms and parameters of buyer or seller",
          "Make Payment to the right payment details provided and the right payment method specified.",
          "Make sure you make payment and confirm payment made within the right time frame given.",
          "Do not release assets until payment is received and terms of trade were duly followed.",
          "Please make sure you made the payment within the time limit, otherwise the order will be canceled.",
        ].map((text) => (
          <Mui.ListItem key={text}>
            <Mui.ListItemText
              secondary={
                <>
                  <MuiIcons.FiberManualRecord
                    sx={{
                      fontSize: 12,
                      mb: -0.2,
                      mr: 1,
                      color: "warning.main",
                    }}
                  />
                  <Mui.Typography variant="caption">{text}</Mui.Typography>
                </>
              }
            />
          </Mui.ListItem>
        ))}
      </Mui.List>
    </Mui.Alert>
    {/* {children} */}
  </Mui.Stack>
);
