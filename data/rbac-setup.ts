import { withRole } from "../lib";

export const ROLES: string[] = [
  "superadmin",
  "company",
  "employee",
  "companyadmin",
]; // specify all the available roles for the entire app

export const PUBLIC_ROUTES: string[] = ["/verification"]; // specify the routes that can be rendered independent of authentication

// specify the routes that can be rendered only when the user is authenticated
export const AUTH_ROUTES: string[] = [
  ...ROLES.map((role) => withRole(["/", "/profile"], role)),
  "/logout",
  "/",
].flat(1);

export const UN_AUTH_ROUTES: string[] = ["/auth"]; // specify the routes that can be rendered only when the user is not authenticated

// specify the routes that are accessible by all roles
// these routes are only accessible when the user is logged in
// `/${role}` will not be prefixed for any route
export const ACCESSIBLE_BY_ALL_ROLES: string[] = ["/logout"];

// specify the home page for each role
// by default, `/${role}` will be prefixed to the route
// rbac will redirect the user to these pages if the the pathname is just '/' and it is not specified in AUTH_ROUTES
export const HOME_PAGE: { [key: string]: string } = {
  superadmin: "/",
  company: "/",
  employee: "/",
};
