import { useRouter } from "next/dist/client/router";
import { useActions } from "../../../hooks";
import { setCookie } from "../../../lib";
import {
  CustomButton,
  SaveIcon,
  DeleteIcon,
  ButtonGroup,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
} from "../../ui";
import { FC } from "../../../data";

export const LoginPageComponent: FC = () => {
  const { query, push } = useRouter();
  const { loginSuccessful } = useActions();

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

  return (
    <Container maxWidth="xs">
      <Typography variant="h2">Login Page</Typography>
      <ButtonGroup>
        <CustomButton
          startIcon={<SaveIcon />}
          variant="contained"
          color="primary"
        >
          Save
        </CustomButton>
        <CustomButton
          startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary"
        >
          Discard
        </CustomButton>
      </ButtonGroup>
      <Grid container spacing={2} justifyContent="center">
        <Grid item lg xs={12} sm={6}>
          <Paper style={{ height: 75, width: "100%" }} />
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ height: 75, width: "100%" }} />
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ height: 75, width: "100%" }} />
        </Grid>
        <Grid item container xs={3}>
          <Grid item container xs={3}>
            <Paper style={{ height: 75, width: "100%" }} />
          </Grid>
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Box order={2} m={1}>
          Two
        </Box>
        <Box order={1} m={2}>
          One
        </Box>
        <Box order={4} m={1}>
          Four
        </Box>
        <Box order={3} p={3}>
          Three
        </Box>
      </Box>
    </Container>
  );
};
