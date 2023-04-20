import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

import API from "@/api";
import { Form } from "@/components";

const TelegramTab = () => {
  const { user } = useSelector((state) => state);

  const telegramAuth = user.tid;

  const [openTelegramID, setOpenTelegramID] = useState(false);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");
  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const enableTFA = (callback) => {
    API.patch(`users/${user._id}`, callback)
      .then((result) => {
        setOpenTelegramID(false);
        createSnack(result.data.message, "success");
      })
      .catch((error) => {
        console.log(error);

        createSnack(error.response.data.message, "error");
      });
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardHeader
          title="Telegram authentication"
          sx={{ color: "primary.main" }}
        />
        <CardContent>
          <Typography
            variant="body1"
            color={telegramAuth ? "success.main" : "error.main"}
          >
            Telegram authentication is{" "}
            {telegramAuth ? "activated" : "not activated"} for you.
          </Typography>
          {!telegramAuth && (
            <Box>
              <Typography gutterBottom paragraph>
                By clicking on the button below, you can activate Telegram
                authentication.
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
          )}
        </CardContent>
      </Card>

      <Dialog open={openTelegramID} onClose={() => setOpenTelegramID(false)}>
        <DialogTitle>Add Telegram authentication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After opening bot, tap my info. Then copy the id provided and paste
            it here.
          </DialogContentText>
          <Form
            name="enableAuth"
            button="Activate"
            btnStyle={{ fullWidth: false, disabled: false }}
            callback={enableTFA}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert onClose={() => setOpenSnack(false)} severity={typeSnack}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TelegramTab;
