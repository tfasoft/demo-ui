import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider, colors, CssBaseline } from "@mui/material";

import Navbar from "./component/navbar";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import PanelPage from "./pages/panel";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: colors.indigo[500],
            },
            white: {
                main: "#ffffff",
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact><HomePage /></Route>
                    <Route path='/auth' exact><AuthPage /></Route>
                    <Route path='/panel' exact><PanelPage /></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
