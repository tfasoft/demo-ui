import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

import { Form } from "../../components";
import API from "../../api";

const SettingsTab = () => {
  const { user } = useSelector((state) => state);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [typeSnack, setTypeSnack] = useState("");
  const createSnack = (message, type) => {
    setMessageSnack(message);
    setTypeSnack(type);

    setOpenSnack(true);
  };

  const updateData = (callback) => {
    API.patch(`users/${user._id}`, callback)
      .then((result) => {
        createSnack(result.data.message, "success");
      })
      .catch((error) => {
        createSnack(error.response.data.message, "error");
      });
  };

  const updatePass = (callback) => {
    API.patch(`users/password/${user._id}`, callback)
      .then((result) => {
        createSnack(result.data.message, "success");
      })
      .catch((error) => {
        createSnack(error.response.data.message, "error");
      });
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardHeader title="Change common data" sx={{ color: "primary.main" }} />
        <CardContent>
          <Form
            name="commonSettings"
            button="Change common data"
            btnStyle={{ fullWidth: true, disabled: false }}
            def={user}
            callback={updateData}
          />
        </CardContent>
      </Card>
      <br />
      <Card variant="outlined">
        <CardHeader
          title="Change security data"
          sx={{ color: "primary.main" }}
        />
        <CardContent>
          <Form
            name="securitySettings"
            button="Change security data"
            btnStyle={{ fullWidth: true, disabled: false }}
            callback={updatePass}
          />
        </CardContent>
      </Card>

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

export default SettingsTab;
