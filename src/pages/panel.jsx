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

const PanelPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (!session) history.push('/auth');

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
        </Container>
    );
}

export default PanelPage;