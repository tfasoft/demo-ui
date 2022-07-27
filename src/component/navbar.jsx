import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Box,
    Button,
} from "@mui/material";

import {deleteUser} from "../redux/actions/user";
import {unsetUID} from "../redux/actions/uid";
import {logoutUser} from "../redux/actions/session";

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);

    return (
        <Box>
            <AppBar
                elevation={0}
            >
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h5"
                            sx={{
                                flexGrow: 1,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                history.push('/');
                            }}
                        >
                            TFASoft Demo
                        </Typography>
                        <Button
                            variant="outlined"
                            color="white"
                            sx={{
                                borderWidth: 2,
                                borderColor: "#ffffff"
                            }}
                            onClick={() => {
                                if (session) {
                                    dispatch(logoutUser());
                                    dispatch(deleteUser());
                                    dispatch(unsetUID());
                                }
                                else {
                                    history.push(`/auth`);
                                }
                            }}
                            disableElevation
                        >
                            {session ? 'Logout' : 'Login'}
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar/>
        </Box>
    );
}

export default Navbar;