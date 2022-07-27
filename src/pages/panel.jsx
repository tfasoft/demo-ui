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

import TelegramTab from "./tabs/telegram";
import SettingsTab from "./tabs/settings";
import HomeTab from "./tabs/home";

const PanelPage = () => {
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (!session) history.push('/auth');

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