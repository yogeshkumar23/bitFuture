import React from "react";
import * as Router from "react-router-dom";
import * as Components from "src/app/components";
import * as Constants from "src/constants";
import * as Contexts from "src/app/contexts";

export const Private = ({ protect, children }: route.Type) => {
  const user = React.useContext(Contexts.UserContext);
  const { pathname } = Router.useLocation();

  if (user?.loading) return <Components.Global.GlobalLoader />;

  if (Boolean(user?.enableTwoFactor) && !Boolean(user?.email_OTP_verified))
    return (
      <Router.Navigate to={`${Constants.API_CONFIG.base}account/two-factor`} />
    );

  if (
    (Boolean(user?.email) &&
      protect &&
      new RegExp(
        `(${[
          "dashboard",
          "profile",
          "notifications",
          ...(user?.permissions || []),
        ].join("|")})`
      ).test(pathname)) ||
    (Boolean(!user?.email) && !protect)
  ) {
    return <>{children}</>;
  }

  return !protect ? (
    <Router.Navigate to="/" />
  ) : (
    <Router.Navigate to={`${Constants.API_CONFIG.base}account/login`} />
  );
};

export declare namespace route {
  export type Type = Child & { protect?: boolean };
}
