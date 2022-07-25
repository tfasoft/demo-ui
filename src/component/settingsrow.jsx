import {
    Box,
    Grid,
} from "@mui/material";

const SettingsRow = (props) => {
    return (
        <Box>
            <Grid
                columns={{md: 12, xs: 6}}
                spacing={2}
                container
            >
                <Grid
                    xs={6}
                    item
                >
                    <Box>{ props.first }</Box>
                </Grid>
                <Grid
                    xs={6}
                    item
                >
                    <Box>{ props.second }</Box>
                </Grid>
            </Grid>
            <br />
        </Box>
    );
}

export default SettingsRow;