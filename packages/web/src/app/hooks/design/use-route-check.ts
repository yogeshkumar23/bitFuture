import * as Router from "react-router-dom";

export const useRouteCheck = (routes: string[]) => {
  const { pathname } = Router.useLocation();
  return routes
    .map((path) =>
      Router.matchPath({ path, caseSensitive: false, end: true }, pathname)
    )
    .filter(Boolean)[0]
    ? true
    : false;
};
