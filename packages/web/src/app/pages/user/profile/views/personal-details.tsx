import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Router from "react-router-dom";
import * as Formik from "formik";
import * as Pages from "src/app/pages";
import * as Components from "src/app/components";
import * as Contexts from "src/app/contexts";

export const PersonalDetails = ({
  user,
}: {
  user: Contexts.userContext.User;
}) => (
  <Components.Global.Container
    id="profileDetails"
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
        password: "........",
      }}
      onSubmit={() => {}}
    >
      {() => (
        <Mui.Stack component={Formik.Form}>
          <Mui.Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            mb={2}
          >
            <Mui.Typography variant="h5">Personal Details</Mui.Typography>
            <Mui.Button
              id="editProfile"
              startIcon={<MuiIcons.EditOutlined />}
              component={Router.Link}
              variant="contained"
              to="edit"
            >
              Edit Profile
            </Mui.Button>
          </Mui.Stack>

          <Pages.User.Profile.Views.UserInfo disabled />
          <Mui.Typography
            id="portfolio"
            variant="body1"
            component={Router.Link}
            to="portfolio"
            color="primary"
            sx={{
              textDecoration: "none",
              fontWeight: 900,
              textAlign: "right",
            }}
          >
            Portfolio <MuiIcons.OpenInNew fontSize="inherit" />
          </Mui.Typography>
        </Mui.Stack>
      )}
    </Formik.Formik>
  </Components.Global.Container>
);
