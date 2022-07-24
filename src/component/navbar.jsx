import { useHistory } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Box,
    Button,
} from "@mui/material";

const Navbar = () => {
    const history = useHistory();

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
                            React TFA Demo
                        </Typography>
                        <Button
                            variant="outlined"
                            color="white"
                            sx={{
                                borderWidth: 2,
                                borderColor: "#ffffff"
                            }}
                            onClick={() => {
                                history.push('/auth');
                            }}
                            disableElevation
                        >
                            Login
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    );
}

export default Navbar;