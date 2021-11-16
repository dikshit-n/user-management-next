import { WITH_RBAC_OPTIONS } from "../../data";
import {
  getReturnElementBasedOnNotFoundProp,
  isAccessibleByRole,
  isUnAuthRoute,
  isPublicRoute,
} from "./utils";

export const withRBAC = (
  component: JSX.Element,
  options: WITH_RBAC_OPTIONS
) => {
  const {
    token,
    pathname,
    onRoleCheckFailure,
    role,
    notFound, // this notFound prop will be considered only when role check fails. Other error pages (like built-in or custom 404 page) will continue to persist even if this notFound prop is falsy.
  } = options;

  // check whether we are in a public route or an error page
  if (isPublicRoute(pathname) || pathname === "/_error") {
    return component;
  } else {
    if (token) {
      // check whether the route is accessible by specified role
      if (isAccessibleByRole(pathname, role)) {
        return component;
      }
      // else check for not found
      return getReturnElementBasedOnNotFoundProp({
        pathname,
        notFound,
        onRoleCheckFailure,
        role,
      });
    } else {
      // check whether we are in login route (unauth routes), then return component else onRoleCheckFailure
      if (isUnAuthRoute(pathname)) {
        return component;
      }
      // else check for not found
      return getReturnElementBasedOnNotFoundProp({
        pathname,
        notFound,
        onRoleCheckFailure,
        role,
      });
    }
  }
};
