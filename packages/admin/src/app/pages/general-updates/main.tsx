import * as Draft from "draft-js";
import * as Formik from "formik";
import * as HTMLConvertor from "draft-js-export-html";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Yup from "yup";
import * as Pages from "src/app/pages";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

const generalNotificationValidate = Yup.object().shape({
  title: Yup.string().required("No Topic provided"),
  text: Yup.string().required("No Message provided"),
  image: Yup.string().required("No Image provided"),
  author: Yup.string().required("Author Not provided"),
  category: Yup.string().required("No Categories provided"),
  tags: Yup.string().required("No Tags provided"),
});

export const Main = () => {
  const navigate = Router.useNavigate();
  const { users, loading } = Hooks.Admin.useUserList();
  const { data: general } = Hooks.Firebase.useFireSnapshot<generalNotification>(
    "collection",
    `general_notifications`
  ).collectionSnapshot();
  const { data: subscribers } =
    Hooks.Firebase.useFireSnapshot<Hooks.Admin.UseUser.User>(
      "collection",
      `subscribers`
    ).collectionSnapshot();

  const { sendNotification } = Hooks.Support.useGeneralNotification();

  const Submit = (
    values: Partial<generalNotification>,
    {
      setSubmitting,
      resetForm,
    }: Formik.FormikHelpers<Partial<generalNotification>>
  ) => {
    const rawContent = Draft.convertFromRaw(JSON.parse(values.text as string));
    const content =
      Draft.EditorState.createWithContent(rawContent).getCurrentContent();
    const htmlContent = HTMLConvertor.stateToHTML(content);
    sendNotification({ ...values, htmlContent });
    setSubmitting(false);
    resetForm();
  };

  const handleClick = (values: Partial<generalNotification>) => {
    navigate(`preview`, {
      state: { ...values, createdTime: new Date().getTime() },
    });
  };

  return general === undefined || subscribers === undefined || loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Mui.Stack spacing={1} sx={{ pr: { xs: 1, md: 2 } }}>
      <Mui.Typography variant="h5">General Updates</Mui.Typography>
      <Pages.General.Views.SendMail title="Send Mail" users={users?.userList} />
      <Pages.General.Views.SendMail
        title="Send Newsletter"
        users={subscribers}
        multiple={true}
      />
      <Components.Global.Container
        direction="column"
        spacing={2}
        customTitle={
          <Mui.Typography variant="h6" color="primary">
            New Updates
          </Mui.Typography>
        }
      >
        <Formik.Formik
          initialValues={{
            text: "",
            title: "",
            image: "",
            author: "",
            category: "",
            tags: "",
            topic: "general",
            is_Read: false,
          }}
          validationSchema={generalNotificationValidate}
          onSubmit={Submit}
        >
          {(props) => (
            <Formik.Form>
              <Mui.Grid container spacing={2}>
                <Mui.Grid item xs={12} md={3}>
                  <Mui.Stack spacing={2}>
                    <Components.Form.FormField
                      size="small"
                      name="title"
                      type="text"
                      placeholder="Title"
                      label="Title"
                      fullWidth
                    />
                    <Components.Form.ImageField
                      name="image"
                      sx={{
                        height: 200,
                        width: "inherit",
                      }}
                      label="Upload Image"
                    />
                    <Components.Form.FormField
                      size="small"
                      name="author"
                      type="text"
                      placeholder="Author"
                      label="Author"
                      fullWidth
                    />
                    <Components.Form.FormField
                      size="small"
                      name="category"
                      type="text"
                      placeholder="Category"
                      label="Category"
                      fullWidth
                    />

                    <Mui.Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      sx={{
                        width: "100%",
                        alignSelf: "flex-end",
                        display: { xs: "none", md: "flex" },
                      }}
                    >
                      <Mui.Button
                        variant="contained"
                        startIcon={<MuiIcons.Visibility />}
                        onClick={() => {
                          handleClick(props.values);
                        }}
                      >
                        Preview
                      </Mui.Button>

                      <Mui.Button
                        variant="contained"
                        type="submit"
                        startIcon={<MuiIcons.Send />}
                      >
                        Send
                      </Mui.Button>
                    </Mui.Stack>
                  </Mui.Stack>
                </Mui.Grid>
                <Mui.Grid item xs={12} md={9}>
                  <Mui.Stack spacing={2}>
                    <Components.Form.FormField
                      size="small"
                      name="tags"
                      type="text"
                      placeholder="Tags"
                      label="Tags"
                      fullWidth
                    />
                    <Components.Form.RichTextEditor
                      id="text"
                      name="text"
                      label="Content"
                    />
                    <Mui.Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      sx={{
                        width: "100%",
                        alignSelf: "flex-end",
                        display: { xs: "flex", md: "none" },
                      }}
                    >
                      <Mui.Button
                        variant="contained"
                        startIcon={<MuiIcons.Visibility />}
                        onClick={() => {
                          handleClick(props.values);
                        }}
                      >
                        Preview
                      </Mui.Button>

                      <Mui.Button
                        variant="contained"
                        type="submit"
                        startIcon={<MuiIcons.Send />}
                      >
                        Send
                      </Mui.Button>
                    </Mui.Stack>
                  </Mui.Stack>
                </Mui.Grid>
              </Mui.Grid>
            </Formik.Form>
          )}
        </Formik.Formik>
      </Components.Global.Container>
      {general
        ?.sort((a, b) => b.createdTime - a.createdTime)
        ?.map((notification, index) => (
          <Pages.User.Notifications.Views.General
            key={index}
            {...notification}
          />
        ))}
      <Router.Outlet />
    </Mui.Stack>
  );
};
