import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Axios from "axios";
import {
    Box,
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
    Snackbar,
    Alert
} from "@mui/material";

import {createUser} from "../../redux/actions/user";

const SettingsTab = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);
    const env = useSelector(state => state.env);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

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

    const updateData = () => {
        const data = {
            uid,
            "data": {
                name,
                email,
                password,
            }
        }

        Axios.post(`${env.REACT_APP_BACKEND_API}/user/update`, data)
            .then((result) => {
                dispatch(createUser(result));

                createSnack('اطلاعات آپدیت شد', 'success');
            })
            .catch((error) => {
                console.log(error);

                createSnack('متاسفانه مشکلی پیش آمد، لطفا بعدا تلاش کنید', 'error');
            });
    }

    return (
        <Box>
            <Card variant="outlined">
                <CardHeader title="تنظیمات" sx={{ color: "primary.main" }} />
                <CardContent>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="نام"
                        placeholder="نام خود را وارد کنید"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="ایمیل"
                        placeholder="ایمیل خود را وارد کنید"
                        size="small"
                        // margin="dense"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="رمز"
                        placeholder="رمز خود را وارد کنید"
                        size="small"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updateData()}
                        disableElevation
                    >
                        تغییر اطلاعات
                    </Button>
                </CardContent>
            </Card>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
                    {messageSnack}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default SettingsTab;