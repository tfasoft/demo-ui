import {useState} from "react";
import Axios from "axios";
import {useSelector} from "react-redux";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    TextField,
    Typography
} from "@mui/material";

const TelegramTab = () => {
    const user = useSelector(state => state.user);

    const telegramAuth = user.tid;

    const [telegramID, setTelegramID] = useState('');
    const [openTelegramID, setOpenTelegramID] = useState(false);

    const enableTFA = () => {
        console.log('Enable TFA');

        // Axios.put(`http://localhost:8000/users/${uid}`, newData)
        //     .then((result) => {
        //         dispatch(createUser(result.data));
        //         setUser(result.data);
        //
        //         setOpenTelegramID(false);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

    return (
        <Box>
            <Typography
                variant="h5"
                color={telegramAuth ? 'success.main' : 'error.main'}
                gutterBottom
            >
                Your Telegram Authentication is { telegramAuth ? 'enable' : 'disable' }
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
                        color="success"
                        onClick={() => setOpenTelegramID(true)}
                        disableElevation
                    >
                        Activate Telegram Authentication
                    </Button>
                </Box>
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
        </Box>
    )
}

export default TelegramTab;