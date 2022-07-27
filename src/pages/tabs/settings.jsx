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
} from "@mui/material";

import {createUser} from "../../redux/actions/user";

const SettingsTab = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.uid);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    const updateData = () => {
        const data = {
            uid,
            "data": {
                name,
                email,
                password,
            }
        }

        Axios.post('http://localhost:5000/user/update', data)
            .then((result) => {
                console.log(result);
                dispatch(createUser(result));
            })
            .catch((error) => {
                console.log(error)
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
        </Box>
    )
}

export default SettingsTab;