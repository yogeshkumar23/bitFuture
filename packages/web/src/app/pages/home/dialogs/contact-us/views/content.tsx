import * as Components from "src/app/components";

export const Content = () => (
  <>
    <Components.Form.FormField name="name" label="Name" size="small" />
    <Components.Form.FormField name="email" label="Email" size="small" />
    <Components.Form.FormField
      name="message"
      label="Message"
      size="small"
      multiline
      rows={4}
    />
    <Components.Form.SubmitButton
      sx={{ height: "fit-content", width: "fit-content" }}
    >
      Send Message
    </Components.Form.SubmitButton>
  </>
);
