import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Axios from "axios";

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
import {createUser} from "../redux/actions/user";

const PanelPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (!session) history.push('/auth');

    const [user, setUser] = useState({});

    useEffect(() => {
        Axios.get(`http://localhost:8000/users/${uid}`)
            .then((result) => {
                dispatch(createUser(result.data));
                setUser(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const uid = useSelector(state => state.uid);

    const telegramAuth = user.tid;

    const [telegramID, setTelegramID] = useState('');
    const [openTelegramID, setOpenTelegramID] = useState(false);

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
            <br />
            <Typography
                variant="h5"
                color={ telegramAuth ? 'success.main' : 'error.main' }
                gutterBottom
            >
                { telegramAuth ? 'Telegram authentication is activated.' : 'Telegram authentication is not activated.' }
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

            <Dialog
                open={openTelegramID}
                onClose={() => setOpenTelegramID(false)}
            >
                <DialogTitle>
                    Authenticate with Telegram
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To get your TID ( Telegram ID ), open TFA bot and click on my info. TID is available there and you can add it herel
                    </DialogContentText>
                    <br />
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