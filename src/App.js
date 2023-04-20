import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  colors,
  CssBaseline,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

import { Navbar } from "./components";

import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import PanelPage from "./pages/panel";

import API from "./api";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Vazirmatn",
    },
    palette: {
      primary: {
        main: colors.indigo[500],
      },
      white: {
        main: "#ffffff",
      },
    },
  });

  const { token } = useSelector((state) => state);

  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/auth" exact>
              <AuthPage />
            </Route>
            <Route path="/panel" exact>
              <PanelPage />
            </Route>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
