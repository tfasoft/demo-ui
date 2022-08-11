import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import Axios from "axios";

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
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Alert,
    Snackbar,
    Button,
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
    PhoneIphone
} from "@mui/icons-material";

import {deleteUser} from "../redux/actions/user";
import {unsetUID} from "../redux/actions/uid";
import {logoutUser} from "../redux/actions/session";

const drawerWidth = 240;
const navItems = [
    {
        name: 'سایت اصلی',
        href: 'https://tfasoft.amirhossein.info',
        icon: <Home />,
    },
    {
        name: 'مستندات',
        href: 'https://docs.amirhossein.info',
        icon: <MenuBook />,
    },
    {
        name: 'بلاگ',
        href: 'https://blog.amirhossein.info',
        icon: <RssFeed />,
    },
    {
        name: 'داشبورد',
        href: 'https://dashboard.amirhossein.info',
        icon: <Dashboard />,
    },
    {
        name: 'موبایل',
        href: 'https://mobile.amirhossein.info',
        icon: <PhoneIphone />,
    },
];

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const session = useSelector(state => state.session);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [dialogOpen, setDialogOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const env = useSelector(state => state.env);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackTitle, setSnackTitle] = useState('');
    const [snackType, setSnackType] = useState('');
    const createSnack = (title, type) => {
        setSnackTitle(title);
        setSnackType(type);

        setSnackOpen(true);
    }

    const repostBug = () => {
        const data = {
            title,
            content,
        }

        Axios.post(`${env.REACT_APP_BACKEND_API}/bug/new`, data)
            .then((result) => {
                createSnack('گزارش شما ارسال شد', 'success');

            })
            .catch((error) => {
                createSnack(error.response.data.message, 'error');
            });
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar />
            <List>
                {
                    navItems.map((item) => (
                        <ListItem
                            key={item}
                            disablePadding
                        >
                            <ListItemButton
                                href={item.href}
                            >
                                <ListItemText
                                    primary={ item.name }
                                    sx={{
                                        textAlign: "right",
                                        mr: 2
                                    }}
                                />
                                <ListItemIcon sx={{ color: "primary.main" }}>
                                    { item.icon }
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
            <List>
                {
                    session
                    ?
                        <Box>
                            <ListItem
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => history.push('/panel')}
                                >
                                    <ListItemText
                                        primary="پنل کاربری"
                                        sx={{
                                            textAlign: "right",
                                            mr: 2
                                        }}
                                    />
                                    <ListItemIcon sx={{ color: "primary.main" }}><Dashboard /></ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <ListItem
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => {
                                        dispatch(logoutUser());
                                        dispatch(deleteUser());
                                        dispatch(unsetUID());
                                    }}
                                >
                                    <ListItemText
                                        primary="خروج"
                                        sx={{
                                            textAlign: "right",
                                            mr: 2
                                        }}
                                    />
                                    <ListItemIcon sx={{ color: "primary.main" }}><Logout /></ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    :
                        <ListItem
                            disablePadding
                        >
                            <ListItemButton
                                onClick={() => history.push('/auth')}
                            >
                                <ListItemText
                                    primary="ورود"
                                    sx={{
                                        textAlign: "right",
                                        mr: 2
                                    }}
                                />
                                <ListItemIcon sx={{ color: "primary.main" }}><Login /></ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                }
            </List>
            <Divider />
            <List>
                <ListItem
                    disablePadding
                >
                    <ListItemButton
                        onClick={() => setDialogOpen(true)}
                    >
                        <ListItemText
                            primary="ارسال گذارش"
                            sx={{
                                textAlign: "right",
                                mr: 2
                            }}
                        />
                        <ListItemIcon sx={{ color: "primary.main" }}><BugReport /></ListItemIcon>
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
                            sx={{ ml: 2 }}
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
                                history.push('/');
                            }}
                        >
                            دمو سرویس آتنتیکیشن TFASoft
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    anchor="right"
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            <Dialog
                sx={{ textAlign: "right", direction: "rtl" }}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle
                    color="primary.main"
                >
                    ارسال گزارش
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        اگر که اینجا هستید به این معنی هست که شاید یک فیدبکی دارید و یا شاید یک مشکل را میخواهید اطلاع دهید. در هر صورت از شما ممنونیم!
                    </DialogContentText>
                    <br />
                    <TextField
                        variant="outlined"
                        color="primary"
                        size="small"
                        placeholder="موضوع مربوطه را وارد کنید"
                        label="موضوع"
                        sx={{ mb: "1rem" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        color="primary"
                        size="small"
                        placeholder="توضیجات مربوطه را وارد کنید"
                        label="توضیحات"
                        sx={{ mb: "1rem" }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        multiline
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => repostBug()}
                        disableElevation
                    >
                        ارسال
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={() => setSnackOpen(false)}
                sx={{ textAlign: "right", direction: "rtl" }}
            >
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity={snackType}
                    sx={{ textAlign: "right", direction: "rtl" }}
                >
                    {snackTitle}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Navbar;