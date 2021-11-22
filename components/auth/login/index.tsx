import { useRouter } from "next/dist/client/router";
import { useActions } from "../../../hooks";
import { setCookie } from "../../../lib";
import { FC, ChangeEvent } from "../../../data";
import { FullPageWrapper, Paper, CustomInput } from "../../ui";
import { useState } from "react";

export const LoginPageComponent: FC = () => {
  const { query, push } = useRouter();
  const { loginSuccessful } = useActions();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const changeHandler = ({
    target: { value, name },
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const login = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc4ZTg4NzIzODk5Zjg2MTAxNjU4MWMiLCJ0eXBlIjoiY29tcGFueSIsImlhdCI6MTYzNjk1NzA0OH0.kpPKbUtytDnkePOER9Qw4wiDGWTgEfYcvjMMkm5806A";
    loginSuccessful({ token, type: "superadmin" });
    setCookie("token", token);
    if (query.redirectURL)
      setTimeout(() => {
        push(`${query.redirectURL || "/"}`);
      }, 2000);
    else {
      push("/");
    }
  };
  console.log(credentials);
  return (
    <FullPageWrapper
      display="grid"
      alignContent="center"
      className="fit-background-image"
      sx={{
        backgroundImage: `url("https://www.photohdx.com/images/2016/09/blue-pattern-background.jpg")`,
      }}
    >
      <Paper
        sx={{
          width: "95%",
          maxWidth: 500,
          mx: "auto",
          p: 2,
        }}
        elevation={3}
      >
        <CustomInput
          label="Email"
          name="email"
          value={credentials.email}
          onChange={changeHandler}
        />
        <br />
        <CustomInput
          label="Password"
          name="password"
          value={credentials.password}
          onChange={changeHandler}
        />
      </Paper>
    </FullPageWrapper>
  );
};
