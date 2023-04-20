import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Alert,
  Snackbar,
} from "@mui/material";

import {
  Menu,
  Dashboard,
  MenuBook,
  RssFeed,
  Home,
  Login,
  Logout,
  BugReport,
  PhoneIphone,
} from "@mui/icons-material";

import { UNSET_USER } from "../../redux/actions/user";
import { UNSET_TOKEN } from "../../redux/actions/token";

import { Form } from "../../components";
import API from "../../api";

const drawerWidth = 240;
const navItems = [
  {
    name: "TFAsoft",
    href: "https://tfasoft.com",
    icon: <Home />,
  },
  {
    name: "Docs",
    href: "https://docs.tfasoft.com",
    icon: <MenuBook />,
  },
  {
    name: "Blog",
    href: "https://blog.tfasoft.com",
    icon: <RssFeed />,
  },
  {
    name: "Dashboard",
    href: "https://dashboard.tfasoft.com",
    icon: <Dashboard />,
  },
  {
    name: "Mobile",
    href: "https://mobile.tfasoft.com",
    icon: <PhoneIphone />,
  },
];

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const session = useSelector((state) => state.token);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState("");
  const [snackType, setSnackType] = useState("");
  const createSnack = (title, type) => {
    setSnackTitle(title);
    setSnackType(type);

    setSnackOpen(true);
  };

  const repostBug = (callback) => {
    API.post(`bug`, callback)
      .then((result) => {
        createSnack(result.data.message, "success");
      })
      .catch((error) => {
        createSnack(error.response.data.message, "error");
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemText primary={item.name} />
              <ListItemIcon sx={{ color: "primary.main" }}>
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {session ? (
          <Box>
            <ListItem disablePadding>
              <ListItemButton onClick={() => history.push("/panel")}>
                <ListItemText primary="Panel" />
                <ListItemIcon sx={{ color: "primary.main" }}>
                  <Dashboard />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  dispatch(UNSET_USER());
                  dispatch(UNSET_TOKEN());
                }}
              >
                <ListItemText primary="Logout" />
                <ListItemIcon sx={{ color: "primary.main" }}>
                  <Logout />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Box>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => history.push("/auth")}>
              <ListItemText primary="Login" />
              <ListItemIcon sx={{ color: "primary.main" }}>
                <Login />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setDialogOpen(true)}>
            <ListItemText primary="Report bug" />
            <ListItemIcon sx={{ color: "primary.main" }}>
              <BugReport />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
        color="primary"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              TFAsoft Demo
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          anchor="left"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle color="primary.main">Report bug</DialogTitle>
        <DialogContent>
          <DialogContentText>
            So, you found a bug! Report it to us please.
          </DialogContentText>
          <Form
            name="reportBug"
            button="Report"
            btnStyle={{ fullWidth: false, disabled: false }}
            callback={repostBug}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={snackType}>
          {snackTitle}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Navbar;
