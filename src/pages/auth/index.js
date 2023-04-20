import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Button,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
  Toolbar,
} from "@mui/material";

import { Telegram } from "@mui/icons-material";

import { SET_TOKEN } from "@/redux/actions/token";
import { SET_USER } from "@/redux/actions/user";

import API from "@/api";
import { Form } from "@/components";

const AuthPage = () => {
  const dispatch = useDispatch();
  const history = useRouter();

  const session = useSelector((state) => state.token);
  if (session) history.push("/panel");

  const [login, setLogin] = useState(true);
  const [openTelegram, setOpenTelegram] = useState(false);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");
  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const usernamePasswordAuth = (callback) => {
    if (login) {
      API.post(`auth/login`, callback)
        .then((result) => {
          const { token, user } = result.data;

          dispatch(SET_TOKEN(token));
          dispatch(SET_USER(user));
        })
        .catch((error) => {
          createSnack(error.response.data.message, "error");
        });
    } else {
      API.post(`auth/register`, callback)
        .then((result) => {
          const { token, user } = result.data;

          dispatch(SET_TOKEN(token));
          dispatch(SET_USER(user));

          createSnack("User is registered", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const telegramAuth = (callback) => {
    API.post(`auth/telegram`, callback)
      .then((result) => {
        const { token, user } = result.data;

        dispatch(SET_TOKEN(token));
        dispatch(SET_USER(user));

        createSnack("User is registered", "success");
      })
      .catch((error) => {
        createSnack(error.response.data.message, "error");
      });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: "2rem",
      }}
    >
      <Toolbar />
      <Card
        variant="outlined"
        sx={{
          borderColor: "primary.main",
        }}
      >
        <CardContent>
          <Form
            name="authentication"
            button={login ? "Login" : "Register"}
            btnStyle={{ fullWidth: true, disabled: false }}
            callback={usernamePasswordAuth}
          />
          <br />
          <Button
            variant="outlined"
            size="large"
            onClick={() => setLogin(!login)}
            disableElevation
            fullWidth
          >
            {login ? "Dont have account, register" : "I have account, login"}
          </Button>
          <br />
          <br />
          <Divider
            sx={{
              borderColor: "primary.main",
            }}
          />
          <Divider />
          <br />
          <Button
            variant="contained"
            size="large"
            startIcon={<Telegram />}
            onClick={() => setOpenTelegram(true)}
            disableElevation
            fullWidth
          >
            Continue with Telegram
          </Button>
        </CardContent>
      </Card>

      <Dialog open={openTelegram} onClose={() => setOpenTelegram(false)}>
        <DialogTitle>Continue with Telegram</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To continue, open tfasoft bot and press login to get a new token.
          </DialogContentText>
          <Form
            name="telegramAuth"
            button="Continue"
            btnStyle={{ fullWidth: false, disabled: false }}
            callback={telegramAuth}
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
    </Container>
  );
};

export default AuthPage;
