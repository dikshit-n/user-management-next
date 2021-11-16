import { ReactElement } from "react";

export interface WITH_RBAC_OPTIONS {
  pathname: string;
  onRoleCheckFailure?: (pathname: string) => any;
  token: string | null | undefined | false;
  notFound?: boolean | undefined | null | ReactElement;
  role: string | null | undefined | false;
}

export interface NOT_FOUND_CHECK_PARAMS {
  notFound: boolean | undefined | null | ReactElement;
  onRoleCheckFailure: ((pathname: string) => any) | undefined;
  pathname: string;
  role: string | null | undefined | false;
}
