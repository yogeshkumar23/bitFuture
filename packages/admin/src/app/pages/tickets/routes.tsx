import * as Router from "react-router-dom";
import * as Pages from "src/app/pages";

export default () =>
  Router.useRoutes([
    {
      path: "/",
      element: <Pages.Ticket.Main />,
      children: [
        { path: "view/:ticketId", element: <Pages.Ticket.Views.ViewTicket /> },
      ],
    },
  ]);
