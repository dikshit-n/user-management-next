import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { REDIRECT_PROPS } from "../../data";

export const Redirect = ({ path, query }: REDIRECT_PROPS) => {
  const { push } = useRouter();
  useEffect(() => {
    push({ pathname: `${path}`, query });
  }, []);
  return null;
};
