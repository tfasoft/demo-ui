import { useState, useEffect } from "react";

import {
    Container,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Divider,
} from "@mui/material";

import {
    Telegram
} from "@mui/icons-material";

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [login, setLogin] = useState(true);

    const usernamePasswordAuth = () => {
        console.log('Username Password Auth');
    }

    const telegramAuth = () => {
        console.log('Auth with Telegram.')
    }

    return (
        <Container
            maxWidth="xs"
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
                        onClick={() => usernamePasswordAuth()}
                        disableElevation
                        fullWidth
                    >
                        { login ? "Login" : "Register" }
                    </Button>
                    <br /><br />
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => setLogin(!login)}
                        disableElevation
                        fullWidth
                    >
                        { login ? "I don't have account" : "I have account" }
                    </Button>
                    <br /><br />
                    <Divider
                        sx={{
                            borderColor: "primary.main"
                        }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Telegram />}
                        onClick={() => telegramAuth()}
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