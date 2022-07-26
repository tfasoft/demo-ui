import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import Axios from "axios";

import {
    Container,
    TextField,
    Button,
    Typography,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    Box,
} from "@mui/material";

import {createUser} from "../redux/actions/user";

import SettingsRow from "../component/settingsrow";

const PanelPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (!session) history.push('/auth');

    const uid = useSelector(state => state.uid)

    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = {
            id: uid,
        };

        Axios.post('http://localhost:5000/user/info', userData)
            .then((result) => {
                const data = result.data;
                dispatch(createUser(data));
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const telegramAuth = user.tid;

    const [telegramID, setTelegramID] = useState('');
    const [openTelegramID, setOpenTelegramID] = useState(false);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const enableTFA = () => {
        const newData = {
            "username": user.username,
            "password": user.password,
            "tid": telegramID,
        }

        Axios.put(`http://localhost:8000/users/${uid}`, newData)
            .then((result) => {
                dispatch(createUser(result.data));
                setUser(result.data);

                setOpenTelegramID(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Container
            sx={{
                mt: "2rem",
            }}
        >
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
            >
                Welcome
            </Typography>
            <Divider
                sx={{
                    borderColor: "primary.main"
                }}
            />
            <br/>
            <SettingsRow
                first={
                    <Box>
                        <Typography
                            variant="h5"
                            gutterBottom
                        >
                            Telegram Authentication
                        </Typography>
                        <Divider/>
                        <br/>
                        <SettingsRow
                            first={
                                <TextField
                                    variant="outlined"
                                    label="Change name"
                                    placeholder="Enter name"
                                    size="small"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            }
                            second={
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                    }}
                                    disableElevation
                                >
                                    Change name
                                </Button>
                            }
                        />
                        <SettingsRow
                            first={
                                <TextField
                                    variant="outlined"
                                    label="Change username"
                                    placeholder="Enter username"
                                    size="small"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={name}
                                />
                            }
                            second={
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                    }}
                                    disableElevation
                                >
                                    Change username
                                </Button>
                            }
                        />
                        <SettingsRow
                            first={
                                <TextField
                                    variant="outlined"
                                    label="Change name"
                                    placeholder="Enter password"
                                    size="small"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            }
                            second={
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                    }}
                                    disableElevation
                                >
                                    Change password
                                </Button>
                            }
                        />
                    </Box>
                }
                second={
                    <Box>
                        <Typography
                            variant="h5"
                            gutterBottom
                        >
                            Telegram Authentication
                        </Typography>
                        <Divider/>
                        <br/>
                        <Typography
                            variant="h5"
                            color={telegramAuth ? 'success.main' : 'error.main'}
                            gutterBottom
                        >
                            {telegramAuth ? 'Telegram authentication is activated.' : 'Telegram authentication is not activated.'}
                        </Typography>
                        {
                            !telegramAuth
                            &&
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => setOpenTelegramID(true)}
                                disableElevation
                            >
                                Activate Telegram Authentication
                            </Button>
                        }
                    </Box>
                }
            />
            <Dialog
                open={openTelegramID}
                onClose={() => setOpenTelegramID(false)}
            >
                <DialogTitle>
                    Authenticate with Telegram
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To get your TID ( Telegram ID ), open TFA bot and click on my info. TID is available there and
                        you can add it here.
                    </DialogContentText>
                    <br/>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Telegram ID"
                        placeholder="Enter Telegram ID"
                        size="small"
                        type="number"
                        onChange={(e) => setTelegramID(e.target.value)}
                        value={telegramID}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => enableTFA()}
                        disableElevation
                    >
                        Enable TFA
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default PanelPage;