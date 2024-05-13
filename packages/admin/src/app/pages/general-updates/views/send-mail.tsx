import * as Draft from "draft-js";
import * as Formik from "formik";
import * as HTMLConvertor from "draft-js-export-html";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as Yup from "yup";
import * as Api from "src/api";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";
import * as Providers from "src/app/providers";

export const SendMail = ({
  title,
  multiple = false,
  users,
  toolbar,
}: {
  title: string;
  users: Hooks.Admin.UseUser.User[] | undefined;
  multiple?: boolean;
  toolbar?: object | undefined;
}) => {
  const handler = Providers.useCustomHandler;

  const sendMailValidation = Yup.object().shape({
    to: Yup.lazy((val) =>
      Array.isArray(val)
        ? Yup.array().of(
            Yup.object()
              .typeError("No To Email Provided")
              .required("No To Email provided")
          )
        : Yup.object()
            .typeError("No To Email Provided")
            .required("No To Email provided")
    ),
    subject: Yup.string().trim().required("No Subject provided"),
    message: Yup.string().trim().required("No Body of Message provided"),
  });

  const Submit = async (
    {
      to,
      subject,
      message,
    }: {
      to: Hooks.Admin.UseUser.User;
      subject: string;
      message: string;
    },
    {
      setSubmitting,
      resetForm,
    }: Formik.FormikHelpers<{
      to: Hooks.Admin.UseUser.User;
      subject: string;
      message: string;
    }>
  ) => {
    const rawContent = Draft.convertFromRaw(JSON.parse(message));
    const content =
      Draft.EditorState.createWithContent(rawContent).getCurrentContent();
    const htmlContent = HTMLConvertor.stateToHTML(content);
    // if (Array.isArray(to)) {
    //   await Promise.all(
    //     to.map((user, index) =>
    //       Api.Server.Request("sendMailNotification", {
    //         email: user?.email,
    //         subject,
    //         htmlContent,
    //         emailType: multiple ? "outside" : "",
    //       })
    //         .then(
    //           (res) =>
    //             to.length === index &&
    //             handler({
    //               message: res.message,
    //               variant: res.error ? "error" : "success",
    //             })
    //         )
    //         .catch(
    //           () =>
    //             to.length === index &&
    //             handler({
    //               message: "Something went wrong",
    //               variant: "error",
    //             })
    //         )
    //     )
    //   );
    // } else {
    await Api.Server.Request("sendMailNotification", {
      email: Array.isArray(to) ? to?.map((user) => user.email) : to?.email,
      subject,
      htmlContent,
      emailType: multiple ? "outside" : "",
    })
      .then((res) =>
        handler({
          message: res.message,
          variant: res.error ? "error" : "success",
        })
      )
      .catch(() =>
        handler({
          message: "Something went wrong",
          variant: "error",
        })
      );
    setSubmitting(false);
    resetForm();
    // }
  };

  return (
    <Components.Global.Container
      direction="column"
      spacing={1}
      // maxWidth="md"
      customTitle={
        <Mui.Typography variant="h6" color="primary">
          {title}
        </Mui.Typography>
      }
    >
      <Formik.Formik
        initialValues={{
          to: "" as unknown as Hooks.Admin.UseUser.User,
          subject: "",
          message: "",
        }}
        validationSchema={sendMailValidation}
        onSubmit={Submit}
      >
        {() => (
          <Formik.Form>
            <Mui.Grid container spacing={2}>
              <Mui.Grid item xs={12}>
                <Mui.Stack spacing={2}>
                  <Components.Form.AutoCompleteField
                    multiple={multiple}
                    name="to"
                    label="To"
                    autoHighlight
                    options={users || [{}]}
                    getOptionLabel={(option: Hooks.Admin.UseUser.User) =>
                      option.email
                        ? `${option.email} ${
                            option.firstName
                              ? `(${option.firstName} ${option.lastName})`
                              : ``
                          }`
                        : ``
                    }
                    renderOption={(props, option: Hooks.Admin.UseUser.User) => (
                      <Mui.Typography component="li" {...props}>
                        {option.email}{" "}
                        {option?.firstName
                          ? `(${option.firstName} ${option.lastName})`
                          : ""}
                      </Mui.Typography>
                    )}
                    renderInput={(params) => (
                      <Mui.TextField {...params} placeholder="Joe@gmail.com" />
                    )}
                    PaperComponent={(props) => (
                      <Mui.Paper elevation={1} {...props} />
                    )}
                  />
                  <Components.Form.FormField
                    size="small"
                    name="subject"
                    placeholder="Subject"
                    label="Subject"
                    fullWidth
                  />
                  <Components.Form.RichTextEditor
                    id="message"
                    name="message"
                    label="Message"
                    toolbar={toolbar}
                  />
                  <Mui.Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    sx={{
                      width: "100%",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Mui.Box flexGrow={1} />
                    <Components.Form.SubmitButton
                      variant="contained"
                      sx={{ width: "fit-content" }}
                      startIcon={<MuiIcons.Send />}
                    >
                      Send
                    </Components.Form.SubmitButton>
                  </Mui.Stack>
                </Mui.Stack>
              </Mui.Grid>
            </Mui.Grid>
          </Formik.Form>
        )}
      </Formik.Formik>
    </Components.Global.Container>
  );
};
