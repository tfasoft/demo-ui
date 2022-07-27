import {useState} from "react";
import Axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Snackbar,
    Alert
} from "@mui/material";
import {createUser} from "../../redux/actions/user";

const TelegramTab = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);
    const env = useSelector(state => state.env);

    const telegramAuth = user.tid;

    const [telegramID, setTelegramID] = useState('');
    const [openTelegramID, setOpenTelegramID] = useState(false);

    // Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState('');
    const [typeSnack, setTypeSnack] = useState('');
    const createSnack = (message, type) => {
        setMessageSnack(message);
        setTypeSnack(type);

        setOpenSnack(true)
    }

    const enableTFA = () => {
        const data = {
            uid,
            "data": {
                tid: telegramID
            }
        }

        Axios.post(`${env.REACT_APP_BACKEND_API}/user/enabletfa`, data)
            .then((result) => {
                console.log(result);
                dispatch(createUser(result));

                setOpenTelegramID(false);

                createSnack('Telegram Authentication is now enabled', 'success');
            })
            .catch((error) => {
                console.log(error);

                createSnack('Sorry, something went wrong', 'error');
            });
    }

    return (
        <Box>
            <Card variant="outlined">
                <CardHeader title="Telegram Authenticaton" sx={{ color: "primary.main" }} />
                <CardContent>
                    <Typography
                        variant="body1"
                        color={telegramAuth ? 'success.main' : 'error.main'}
                    >
                        Your Telegram Authentication is { telegramAuth ? 'enable.' : 'disable.' }
                    </Typography>
                    {
                        !telegramAuth
                        &&
                        <Box>
                            <Typography
                                gutterBottom
                                paragraph
                            >
                                You can enable TFA with clicking the button below.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenTelegramID(true)}
                                disableElevation
                            >
                                Activate
                            </Button>
                        </Box>
                    }
                </CardContent>
            </Card>

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
                        type="text"
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

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
                    {messageSnack}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default TelegramTab;