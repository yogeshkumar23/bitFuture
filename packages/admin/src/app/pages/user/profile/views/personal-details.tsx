import * as Formik from "formik";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";
import * as Pages from "src/app/pages";

export const PersonalDetails = () => {
  const user = React.useContext(Contexts.UserContext);

  return (
    <Components.Global.Container
      direction="column"
      justifyContent="start"
      spacing={2}
    >
      <Formik.Formik
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          profileImage: user?.profileImage,
          password: ". . . . . . . .",
        }}
        onSubmit={() => {}}
      >
        {() => (
          <Formik.Form>
            <Mui.Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mb={2}
            >
              <Mui.Typography variant="h5">Personal Details</Mui.Typography>
              <Mui.Button
                startIcon={<MuiIcons.EditOutlined />}
                component={Router.Link}
                variant="contained"
                to="edit"
              >
                Edit Profile
              </Mui.Button>
            </Mui.Stack>

            <Pages.User.Profile.Views.UserInfo disabled />
          </Formik.Form>
        )}
      </Formik.Formik>
    </Components.Global.Container>
  );
};
