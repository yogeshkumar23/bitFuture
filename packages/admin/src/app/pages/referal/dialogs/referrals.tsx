import * as Mui from "@mui/material";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Hooks from "src/app/hooks";

export const Referrals = () => {
  const { userId } = Router.useParams();
  const { referredUsers, loading } = Hooks.Admin.useReferredUserList(userId);

  const data = referredUsers?.userLists?.[0]?.referredUsers
    ? referredUsers.userLists[0].referredUsers?.map((user) => ({
        username: `${user.firstName} ${user.lastName}`,
        email: user.email,
      }))
    : [];

  return loading ? (
    <Components.Global.GlobalLoader />
  ) : (
    <Components.Global.Dialog fullScreen={true} icon>
      <Mui.DialogTitle>
        <Mui.Typography variant="h5">{`${referredUsers?.userLists?.[0]?.firstName} ${referredUsers?.userLists?.[0]?.lastName}`}</Mui.Typography>
      </Mui.DialogTitle>
      <Mui.CardContent>
        <Components.Global.ResponsiveTable
          id={`${referredUsers?.userLists?.[0]?.firstName} ${referredUsers?.userLists?.[0]?.lastName} Referrals List`}
          titles={["Username", "Email"]}
          data={data}
        />
      </Mui.CardContent>
    </Components.Global.Dialog>
  );
};
