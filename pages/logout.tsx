import { NextPage } from "../data";
import { useRouter } from "next/dist/client/router";
import { useLayoutEffect } from "react";
import { AppLoader } from "../components";
import { useActions } from "../hooks";
import { deleteCookie } from "../lib";

const Logout: NextPage = () => {
  const { logout } = useActions();
  const { replace } = useRouter();
  useLayoutEffect(() => {
    setTimeout(() => {
      deleteCookie("token");
      logout();
      replace("/auth/login");
    }, 2000);
  }, []);

  return <AppLoader />;
};

export default Logout;
