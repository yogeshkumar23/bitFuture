import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Assets from "src/assets";
import * as Constants from "src/constants";
import * as Components from "src/app/components";
import { useTranslation } from "react-i18next";


export const SearchBox = ({
  setFilter,
  p2pCurrency,
}: {
  setFilter: React.Dispatch<
    React.SetStateAction<{
      amount: number;
      amountType: string;
      paymentType: string;
    }>
  >;
  p2pCurrency: string[];
}) => {
  const isMobile = Mui.useMediaQuery(Mui.useTheme().breakpoints.down("md"));
  const {t} = useTranslation();

  const initial = {
    amount: "" as unknown as number,
    amountType: "0",
    paymentType: "all",
  };

  const Submit = (
    values: search.Form,
    { setSubmitting }: Formik.FormikHelpers<search.Form>
  ) => {
    setFilter(values);
    setSubmitting(false);
  };

  const Refresh = (
    _: search.Form,
    { setValues }: Formik.FormikHelpers<search.Form>
  ) => {
    setFilter(initial);
    setValues(initial);
  };

  return (
    <Formik.Formik initialValues={initial} onSubmit={Submit} onReset={Refresh}>
      {() => (
        <Formik.Form id="filterAds">
          <Components.Global.Container
            justifyContent="initial"
            alignItems="flex-end"
            direction={isMobile ? "column" : "row"}
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[100]}`,
            }}
            spacing={3}
          >
            <Components.Form.AmountField
              size="small"
              name="amount"
              label={`${t('amount')}`}
              placeholder={`${t('enter')} ${t('amount')}`}
              InputProps={{
                endAdornment: (
                  <Mui.InputAdornment position="end" sx={{ mr: -1.8, mt: -1 }}>
                    <Components.Form.SelectField name="amountType" size="small">
                      <Mui.MenuItem value="0">{t('all')}</Mui.MenuItem>
                      {p2pCurrency.map((text, index) => (
                        <Mui.MenuItem key={index} value={text}>
                          {text}
                        </Mui.MenuItem>
                      ))}
                    </Components.Form.SelectField>
                  </Mui.InputAdornment>
                ),
              }}
            />
            <Components.Form.SelectField
              size="small"
              name="paymentType"
              label={`${t('payment')}`}
              sx={{
                minWidth: { md: 200 },
                "& .MuiListItemIcon-root": {
                  display: "none",
                },
              }}
            >
              <Mui.MenuItem value="all">
                <Mui.ListItemIcon>
                  <Mui.Avatar
                    src={Assets.AllPayment}
                    sx={{ height: 25, width: 25 }}
                  />
                </Mui.ListItemIcon>
                {t('allPayments')}
              </Mui.MenuItem>
              {Object.entries(Constants.PaymentType).map(
                ([key, value], index) => (
                  <Mui.MenuItem value={key} key={index}>
                    <Mui.ListItemIcon>
                      <Mui.CardMedia
                        component="img"
                        src={value}
                        sx={{ height: 25, width: 25 }}
                      />
                    </Mui.ListItemIcon>
                    {key}
                  </Mui.MenuItem>
                )
              )}
            </Components.Form.SelectField>
            <Mui.Stack
              sx={{ width: "100%", maxWidth: 500 }}
              justifyContent="space-between"
              direction="row"
            >
              <Components.Form.SubmitButton
                id="filter"
                sx={{ height: "initial", width: "fit-content" }}
                startIcon={<MuiIcons.Search />}
              >
                {t('search')}
              </Components.Form.SubmitButton>
              <Mui.Button
                id="clearFilter"
                variant="outlined"
                color="secondary"
                startIcon={<MuiIcons.Refresh />}
                type="reset"
              >
                {t('refresh')}
              </Mui.Button>
            </Mui.Stack>
          </Components.Global.Container>
        </Formik.Form>
      )}
    </Formik.Formik>
  );
};

export declare namespace search {
  export interface Form {
    amount: number;
    amountType: string;
    paymentType: string;
  }
}
