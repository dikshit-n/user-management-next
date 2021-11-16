import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { REPLACE_PROPS } from "../../data";

export const Replace = ({ path, query }: REPLACE_PROPS) => {
  const { replace } = useRouter();
  useEffect(() => {
    replace({ pathname: path, query });
  }, []);
  return null;
};
