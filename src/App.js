import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {createTheme, ThemeProvider, colors, CssBaseline} from "@mui/material";
import {useDispatch} from "react-redux";

import {envCreate} from "./redux/actions/env";

import Navbar from "./component/navbar";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import PanelPage from "./pages/panel";

function App() {
    const dispatch = useDispatch();

    const theme = createTheme({
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
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/' exact><HomePage/></Route>
                    <Route path='/auth' exact><AuthPage/></Route>
                    <Route path='/panel' exact><PanelPage/></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
