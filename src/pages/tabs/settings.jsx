import {useState} from "react";

import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";

const SettingsTab = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateData = () => {
        console.log("Update Data");
    }

    return (
        <Box>
            <Typography
                variant="h5"
                color="primary"
                gutterBottom
            >
                Settings
            </Typography>
            <br />
            <Card variant="outlined">
                <CardHeader title="Change name" />
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updateData()}
                        disableElevation
                    >
                        Change name
                    </Button>
                </CardContent>
            </Card>
            <br />
            <Card variant="outlined">
                <CardHeader title="Change email" />
                <CardContent>
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updateData()}
                        disableElevation
                    >
                        Change email
                    </Button>
                </CardContent>
            </Card>
            <br />
            <Card variant="outlined">
                <CardHeader title="Change password" />
                <CardContent>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="Password"
                        placeholder="Enter password"
                        size="small"
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
                        Change password
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SettingsTab;