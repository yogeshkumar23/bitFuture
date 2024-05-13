import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () => {
  const { state } = Router.useLocation() as { state: generalNotification };
  return Router.useRoutes([
    {
      path: "/",
      element: <Pages.General.Main />,
      children: [
        {
          path: "preview",
          element: (
            <Pages.User.Notifications.Views.General {...state} preview />
          ),
        },
      ],
    },
  ]);
};
