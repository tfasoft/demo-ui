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

    Axios.post(`${env.REACT_APP_BACKEND_API}/user/info`, {id: uid})
        .then((result) => {
            const data = result.data;
            dispatch(createUser(data));
        })
        .catch((error) => {
            console.log(error);
        });

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
                dispatch(createUser(result));

                setOpenTelegramID(false);
                createSnack('اتنتیکیشن تلگرام برای حساب شما فعال شد', 'success');
            })
            .catch((error) => {
                console.log(error);

                createSnack('متاسفانه مشکلی پیش آمد، لطفا بعدا تلاش کنید', 'error');
            });
    }

    return (
        <Box>
            <Card variant="outlined">
                <CardHeader title="احراز هویت تلگرام" sx={{ color: "primary.main" }} />
                <CardContent>
                    <Typography
                        variant="body1"
                        color={telegramAuth ? 'success.main' : 'error.main'}
                    >
                        آتنتیکیشن تلگرام برای اکانت شما فعال { telegramAuth ? 'است.' : 'نیست.' }
                    </Typography>
                    {
                        !telegramAuth
                        &&
                        <Box>
                            <Typography
                                gutterBottom
                                paragraph
                            >
                                شما میتوانید با کلیک روی دکمه زیر احراز هویت تلگزام را فعال کنید.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenTelegramID(true)}
                                disableElevation
                            >
                                فعال سازی
                            </Button>
                        </Box>
                    }
                </CardContent>
            </Card>

            <Dialog
                sx={{ textAlign: "right", direction: "rtl" }}
                open={openTelegramID}
                onClose={() => setOpenTelegramID(false)}
            >
                <DialogTitle>
                    احراز هویت با تلگرام
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        پس از وارد بات تلگرام شدن، وقتی روی اطلاعات من بزنید آیدی عددی تلگرام خوذ را مشاهده میکنید. با کپی آیدی و وارد کردن در یلد زیر، احراز هویت برای شما فعال میشود.
                    </DialogContentText>
                    <br/>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="آیدی تلگرام"
                        placeholder="آیدی تلگرام را وارد کنید"
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
                        فعال سازی آحراز هویت
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