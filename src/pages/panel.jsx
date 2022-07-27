import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import Axios from "axios";

import {
    Container,
    Box,
    Tab,
} from "@mui/material";

import {
    TabContext,
    TabList,
    TabPanel
} from "@mui/lab";

import {createUser} from "../redux/actions/user";
import TelegramTab from "./tabs/telegram";
import SettingsTab from "./tabs/settings";
import HomeTab from "./tabs/home";

const PanelPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (!session) history.push('/auth');

    const env = useSelector(state => state.env);

    const uid = useSelector(state => state.uid);
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = {
            id: uid,
        };

        Axios.post(`${env.REACT_APP_BACKEND_API}/user/info`, userData)
            .then((result) => {
                const data = result.data;
                dispatch(createUser(data));
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, [user, uid]);

    const [tab, setTab] = useState('1');
    const changeTab = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: "2rem",
                mb: "2rem",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                }}
            >
                <TabContext value={tab}>
                    <Box sx={{borderRight: 1, borderColor: "divider"}}>
                        <TabList
                            onChange={changeTab}
                            orientation="vertical"
                            variant="scrollable"
                        >
                            <Tab label="Home" value="1"/>
                            <Tab label="Settings" value="2"/>
                            <Tab label="Telegram" value="3"/>
                        </TabList>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <TabPanel value="1">
                            <HomeTab/>
                        </TabPanel>
                        <TabPanel value="2">
                            <SettingsTab/>
                        </TabPanel>
                        <TabPanel value="3">
                            <TelegramTab/>
                        </TabPanel>
                    </Box>
                </TabContext>
            </Box>
        </Container>
    );
}

export default PanelPage;