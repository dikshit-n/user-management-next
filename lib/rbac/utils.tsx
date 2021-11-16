import {
  ACCESSIBLE_BY_ALL_ROLES,
  AUTH_ROUTES,
  HOME_PAGE,
  NOT_FOUND_CHECK_PARAMS,
  PUBLIC_ROUTES,
  UN_AUTH_ROUTES,
} from "../../data";
import { CustomErrorComponent, Replace } from "../../components";

const getValidRouteName = (pathname: string) => {
  if (pathname) {
    let newPathname = pathname;
    if (!newPathname.startsWith("/")) {
      newPathname = `/${newPathname}`;
    }
    if (!newPathname.endsWith("/")) {
      newPathname = `${newPathname}/`;
    }
    return newPathname;
  }
  return pathname;
};

const isRoutePresent = (pathname: string, route: string) => {
  if (pathname && route) {
    pathname = getValidRouteName(pathname);
    route = getValidRouteName(route);
    return pathname === "/" || route === "/" // strict check if the path is '/'
      ? route === pathname
      : pathname.startsWith(route) || route.startsWith(pathname);
  }
  return false;
};

export const isPublicRoute = (pathname: string | undefined | null | false) => {
  if (pathname)
    return !!PUBLIC_ROUTES.find((route) => isRoutePresent(pathname, route));
  return false;
};

export const isAuthRoute = (pathname: string | undefined | null | false) => {
  if (pathname)
    return !!AUTH_ROUTES.find((route) => isRoutePresent(pathname, route));
  return false;
};

export const isUnAuthRoute = (pathname: string | undefined | null | false) => {
  if (pathname)
    return !!UN_AUTH_ROUTES.find((route) => isRoutePresent(pathname, route));
  return false;
};

export const isAccessibleByRole = (
  pathname: string | undefined | null | false,
  role: string | undefined | null | false
) => {
  if (pathname && role) {
    pathname = getValidRouteName(pathname);
    role = getValidRouteName(role);
    return (
      !!ACCESSIBLE_BY_ALL_ROLES.find((route) =>
        isRoutePresent(`${pathname}`, route)
      ) || getValidRouteName(pathname).startsWith(getValidRouteName(role))
    );
  }
  return false;
};

export const getReturnElementBasedOnNotFoundProp = (
  options: NOT_FOUND_CHECK_PARAMS
) => {
  const { notFound, onRoleCheckFailure, pathname, role } = options;
  if (onRoleCheckFailure) onRoleCheckFailure(pathname);
  if (pathname === "/" && role) {
    // redirect user to the homepage respective to his role ie. `/${role}${HOME_PAGE[role]}`(the route should start with his role name). eg. /superadmin/
    if (HOME_PAGE[role]) return <Replace path={`/${role}${HOME_PAGE[role]}`} />;
    // if homepage is not defined, then return 404 despite checking notFound prop.
    else return <CustomErrorComponent statusCode={404} />;
  }
  if (notFound) {
    // if not found is a boolean return the default 404 page of next js or your custom 404 page based on condition
    if (typeof notFound === "boolean") {
      if (notFound) return <CustomErrorComponent statusCode={404} />;
    }
    // else return the custom not found they provided
    return notFound;
  } else {
    // redirect user to the homepage respective to his role ie. `/${role}${HOME_PAGE[role]}`(the route should start with his role name). eg. /superadmin/
    if (role && HOME_PAGE[role])
      return <Replace path={`/${role}${HOME_PAGE[role]}`} />;
    // if homepage is not defined, then return 404 despite checking notFound prop.
    else return <CustomErrorComponent statusCode={404} />;
  }
};

export const withRole = (
  pathnames: string[],
  role: string | undefined | null | false
) => {
  if (pathnames && role)
    return pathnames.map((pathname) => `/${role}${pathname}`);
  return "";
};
