import * as Mui from "@mui/material";
import * as Components from "src/app/components";

export const Content = () => (
  <>
    <Mui.Grid container component={Mui.DialogContent} spacing={1}>
      <Mui.Grid item xs={12}>
        <Mui.Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Mui.Stack>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Components.Form.FormField
          size="small"
          name="comment"
          label="Post Your Comment Here"
          multiline
          rows={4}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <Components.Form.RatingButton name="rating" label="Give your rating" />
      </Mui.Grid>
    </Mui.Grid>
    <Mui.Stack component={Mui.DialogActions} justifyContent="center">
      <Components.Form.SubmitButton sx={{ maxWidth: 200 }}>
        Post
      </Components.Form.SubmitButton>
    </Mui.Stack>
  </>
);
