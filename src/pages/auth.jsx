import { useState, useEffect } from "react";

import {
    Container,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import {
    Telegram
} from "@mui/icons-material";

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [telegramToken, setTelegramToken] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [tokenError, setTokenError] = useState(false);

    const [login, setLogin] = useState(true);
    const [openTelegram, setOpenTelegram] = useState(false);

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
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        error={usernameError}
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        error={passwordError}
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
                        onClick={() => setOpenTelegram(true)}
                        disableElevation
                        fullWidth
                    >
                        Continue with Telegram
                    </Button>
                </CardContent>
            </Card>

            <Dialog
                open={openTelegram}
                onClose={() => setOpenTelegram(false)}
            >
                <DialogTitle>
                    Authenticate with Telegram
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Open TFASoft bot and generate a token. Paste your token in the field below.
                    </DialogContentText>
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Token"
                        placeholder="Paste token"
                        size="small"
                        type="password"
                        onChange={(e) => setTelegramToken(e.target.value)}
                        value={telegramToken}
                        error={tokenError}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => telegramAuth()}
                        disableElevation
                    >
                        Authenticate
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default AuthPage;