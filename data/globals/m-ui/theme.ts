import { createTheme } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: { main: green[400] },
    secondary: { main: orange[400] },
    success: { main: green[800] },
  },
  typography: {
    h2: {
      fontSize: 20,
    },
  },
});
