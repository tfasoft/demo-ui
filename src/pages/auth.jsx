import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Axios from "axios";

import {
    Container,
    TextField,
    Button,
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
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (session) history.push('/panel');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telegramToken, setTelegramToken] = useState('');

    const [emailError, setEmailError] = useState(false);
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
        setEmailError(false);
        setPasswordError(false);

        if (email !== '' && password !== '') {
            if (login) {
                const user = {
                    email,
                    password
                }
                console.log('Login user with email and password');
                Axios.post('http://localhost:5000/auth/login', user)
                    .then((result) => {
                        // if (result.data.length === 1) {
                        //     const user = result.data[0];
                        //
                        //     dispatch(createUser(user));
                        //     dispatch(setUID(user.id));
                        //     dispatch(loginUser(true));
                        //
                        //     createSnack('User is founded', 'success');
                        //
                        //     setUsername('');
                        //     setPassword('');
                        // } else {
                        //     createSnack('User is not found', 'error');
                        // }
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                const user = {
                    email,
                    password,
                    "tid": null
                };
                console.log('Register user with email and password');
                Axios.post(`http://localhost:5000/auth/register`, user)
                    .then((result) => {
                        // const user = result.data;
                        //
                        // dispatch(createUser(user));
                        // dispatch(setUID(user.id));
                        // dispatch(loginUser(true));
                        //
                        // createSnack('User is registered', 'success');
                        //
                        // setEmail('');
                        // setPassword('');
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            if (email === '') setEmailError(true);
            if (password === '') setPasswordError(true);
        }
    }

    const telegramAuth = () => {
        setTokenError(false);

        if (telegramToken !== '') {
            setTelegramLoading(true);

            const data = {
                tid: telegramToken,
            }

            Axios.post('http://localhost:5000/auth/telegram', data)
                .then((result) => {
                    console.log(result.data);

                    setTelegramLoading(false);
                })
                .catch((error) => {
                    console.log(error);

                    setTelegramLoading(false);
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
                        label="Email"
                        placeholder="Enter your email"
                        size="medium"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={emailError}
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