import * as Mui from "@mui/material";
import * as Pages from "src/app/pages";

export const EditPaymentDetails = ({
  updatePayment,
  payment,
}: {
  updatePayment: (type: string, values: object) => Promise<void>;
  payment: paymentDetails;
}) => (
  <Mui.Container maxWidth="md" sx={{ p: { xs: 0, sm: 1 } }}>
    <Pages.User.Profile.Views.PaymentDetails
      variant="edit"
      updatePayment={updatePayment}
      payment={payment}
    />
  </Mui.Container>
);
