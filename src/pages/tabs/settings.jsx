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

                createSnack('Data updated', 'success');
            })
            .catch((error) => {
                console.log(error);

                createSnack('Sorry, something went wront', 'error');
            });
    }

    return (
        <Box>
            <Card variant="outlined">
                <CardHeader title="Settings" sx={{ color: "primary.main" }} />
                <CardContent>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Name"
                        placeholder="Enter name"
                        size="small"
                        // margin="dense"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Email"
                        placeholder="Enter email"
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
                        label="Password"
                        placeholder="Enter password"
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
                        Update data
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