import "../assets/scss/globals.scss";
import { wrapper } from "../redux";
import { useActions, useTypedSelector } from "../hooks";
import { useEffect } from "react";
import { AppLoader } from "../components";
import { useRouter } from "next/dist/client/router";
import { isAuthRoute, isPublicRoute, withRBAC } from "../lib";
// import Logout from "./logout";
import { Replace, ThemeProvider } from "../components";
import { AppProps, theme } from "../data";

function MyApp({ Component, pageProps }: AppProps) {
  const { checkauthStatus } = useActions();
  const {
    data: { token, type },
    loading,
    error,
  } = useTypedSelector((state) => state.auth);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    // don't check for authentication, if the route is a public or an error page
    if (!isPublicRoute(pathname) && pathname !== "/_error") checkauthStatus();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <AppLoader {...pageProps} />
      ) : error ? (
        // ask for authentication if error occured during authentication
        // if the current page is an unauthroute, then return it
        isAuthRoute(pathname) ? (
          <Replace path={"/auth"} query={{ redirectURL: pathname }} />
        ) : (
          <Component {...pageProps} />
        )
      ) : (
        // logout if error occurs during authentication
        // <Logout />
        withRBAC(<Component {...pageProps} />, {
          pathname,
          token,
          notFound: false, // whether to display notFound when role check fails
          role: type,
        })
      )}
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
