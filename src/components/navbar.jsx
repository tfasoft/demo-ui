import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

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
    Drawer
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
} from "@mui/icons-material";

import {deleteUser} from "../redux/actions/user";
import {unsetUID} from "../redux/actions/uid";
import {logoutUser} from "../redux/actions/session";

const drawerWidth = 240;
const navItems = [
    {
        name: 'TFASoft',
        href: 'https://tfasoft.amirhossein.info',
        icon: <Home />,
    },
    {
        name: 'Docs',
        href: 'https://docs.amirhossein.info',
        icon: <MenuBook />,
    },
    {
        name: 'Blog',
        href: 'https://blog.amirhossein.info',
        icon: <RssFeed />,
    },
    {
        name: 'Dashboard',
        href: 'https://dashboard.amirhossein.info',
        icon: <Dashboard />,
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

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar />
            <Typography
                variant="h6"
                sx={{ my: 2 }}
            >
                TFASoft services
            </Typography>
            <Divider />
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
                                <ListItemIcon sx={{ color: "primary.main" }}>{ item.icon }</ListItemIcon>
                                <ListItemText
                                    primary={ item.name }
                                />
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
                                    <ListItemIcon sx={{ color: "primary.main" }}><Dashboard /></ListItemIcon>
                                    <ListItemText
                                        primary="Panel"
                                    />
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
                                    <ListItemIcon sx={{ color: "primary.main" }}><Logout /></ListItemIcon>
                                    <ListItemText
                                        primary="Logout"
                                    />
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
                                <ListItemIcon sx={{ color: "primary.main" }}><Login /></ListItemIcon>
                                <ListItemText
                                    primary="Login"
                                />
                            </ListItemButton>
                        </ListItem>
                }
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
                            sx={{ mr: 2 }}
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
                            TFASoft Demo
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
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

            <Toolbar/>
        </Box>
    );
}

export default Navbar;