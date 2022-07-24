import {
    Container,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
} from "@mui/material";

import {
    Telegram
} from "@mui/icons-material";

const AuthPage = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: "2rem",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    borderColor: "primary.main",
                }}
            >
                <CardContent>
                    <Typography>Hello</Typography>
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Username"
                        placeholder="Pick a username"
                        size="medium"
                        type="text"
                        fullWidth
                    />
                    <br /><br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Password"
                        placeholder="Pick a password"
                        size="medium"
                        type="password"
                        fullWidth
                    />
                    <br /><br />
                    <Button
                        variant="contained"
                        size="large"
                        disableElevation
                        fullWidth
                    >
                        Create account
                    </Button>
                    <br /><br />
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Telegram />}
                        disableElevation
                        fullWidth
                    >
                        Continue with Telegram
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

export default AuthPage;