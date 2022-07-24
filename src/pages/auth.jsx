import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Axios from "axios";
import tfa from "tfa-node-sdk";

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
    Snackbar,
    Alert,
} from "@mui/material";

import {
    Telegram
} from "@mui/icons-material";

import {createUser} from "../redux/actions/user";
import {setUID} from "../redux/actions/uid";
import {loginUser} from "../redux/actions/session";

const AuthPage = () => {
    const dispatch = useDispatch();
    const auth = new tfa("WuBjwvrQencoplabrUtPvDKaz");

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [telegramToken, setTelegramToken] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [tokenError, setTokenError] = useState(false);

    const [login, setLogin] = useState(true);
    const [openTelegram, setOpenTelegram] = useState(false);
    const [telegramLoading, setTelegramLoading] = useState(false);

    // Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState('');
    const [typeSnack, setTypeSnack] = useState('');
    const createSnack = (message, type) => {
        setMessageSnack(message);
        setTypeSnack(type);

        setOpenSnack(true)
    }

    const usernamePasswordAuth = () => {
        setUsernameError(false);
        setPasswordError(false);

        if (username !== '' && password !== '') {
            if (login) {
                const user = {
                    username,
                    password
                }
                Axios.get(`http://localhost:8000/users?username=${username}&password=${password}`)
                    .then((result) => {
                        if (result.data.length === 1) {
                            const user = result.data[0];

                            dispatch(createUser(user));
                            dispatch(setUID(user.id));
                            dispatch(loginUser(true));

                            createSnack('User is founded', 'success');
                        } else {
                            createSnack('User is not found', 'error');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                const user = {
                    username,
                    password,
                    "tid": null
                };

                Axios.post(`http://localhost:8000/users`, user)
                    .then((result) => {
                        const user = result.data;

                        dispatch(createUser(user));
                        dispatch(setUID(user.id));
                        dispatch(loginUser(true));

                        createSnack('User is registered', 'success');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            if (username === '') setUsernameError(true);
            if (password === '') setPasswordError(true);
        }
    }

    const telegramAuth = () => {
        setTokenError(false);

        if (telegramToken !== '') {
            const user = auth.authUser(telegramToken);
            setTelegramLoading(true);

            user.then((result) => {
                setTelegramLoading(false);

                if (result.status !== undefined) {
                    const resultObject = result.data;
                    const resultUser = resultObject.user;

                    console.log(resultUser);

                    Axios.get(`http://localhost:8000/users?tid=${resultUser.uid}`)
                        .then((result) => {
                            if (result.data.length === 0) {
                                const user = {
                                    username: null,
                                    password: null,
                                    tid: resultUser.uid
                                };

                                Axios.post(`http://localhost:8000/users`, user)
                                    .then((result) => {
                                        const user = result.data;

                                        dispatch(createUser(user));
                                        dispatch(setUID(user.id));
                                        dispatch(loginUser(true));

                                        createSnack('User is created.', 'success');
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            } else {
                                Axios.get(`http://localhost:8000/users?tid=${resultUser.uid}`)
                                    .then((result) => {
                                        if (result.data.length === 1) {
                                            const user = result.data[0];

                                            dispatch(createUser(user));
                                            dispatch(setUID(user.id));
                                            dispatch(loginUser(true));

                                            createSnack('User is login', 'success');
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    const resultObject = result.response.data;
                    createSnack(resultObject.message, 'error');
                }
            });
        } else {
            setTokenError(true);
        }
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
                        disabled={telegramLoading}
                    >
                        Authenticate
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
                    {messageSnack}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default AuthPage;