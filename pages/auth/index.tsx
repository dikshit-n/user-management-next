import { NextPage } from "../../data";
import { useRouter } from "next/dist/client/router";
import { Replace } from "../../components";

const Auth: NextPage = () => {
  const { query } = useRouter();
  return <Replace path="/auth/login" query={query} />;
};

export default Auth;
