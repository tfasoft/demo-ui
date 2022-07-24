import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Box,
    Button,
} from "@mui/material";

const Navbar = () => {
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
                            }}
                        >
                            Hello
                        </Typography>
                        <Button
                            variant="outlined"
                            color="white"
                            sx={{
                                borderWidth: 2,
                                borderColor: "#ffffff"
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