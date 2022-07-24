import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider, colors, CssBaseline } from "@mui/material";
import Navbar from "./component/navbar";

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
                    <Route path='/' exact>Index</Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
