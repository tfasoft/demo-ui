import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {createTheme, ThemeProvider, colors, CssBaseline, Box} from "@mui/material";
import {useDispatch} from "react-redux";

import {envCreate} from "./redux/actions/env";

import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import PanelPage from "./pages/panel";

function App() {
    const dispatch = useDispatch();

    const theme = createTheme({
        // direction: "rtl",
        typography: {
            fontFamily: "Vazirmatn",
        },
        palette: {
            primary: {
                main: colors.indigo[500],
            },
            white: {
                main: "#ffffff",
            }
        },
    });

    dispatch(envCreate(process.env));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{ textAlign: "right", direction: "rtl" }}>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path='/' exact><HomePage/></Route>
                        <Route path='/auth' exact><AuthPage/></Route>
                        <Route path='/panel' exact><PanelPage/></Route>
                    </Switch>
                </Router>
            </Box>
        </ThemeProvider>
    );
}

export default App;
