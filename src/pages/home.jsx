import {
    Container,
    Typography,
    Grid,
} from "@mui/material";

const HomePage = () => {
    return (
        <Container>
            <Grid
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                spacing={2}
                container
            >
                <Grid
                    md={6}
                    sm={12}
                    sx={12}
                    item
                >
                    <Typography
                        variant="h3"
                        color="primary"
                        gutterBottom
                    >
                        TFAsoft Demo
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        gutterBottom
                    >
                        TFAsoft is a new modern authentication service that you can use it in your application. Users will be manage their account with Telegram. We have Google Authentication that we are all familiar with.
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        gutterBottom
                    >
                        So, TFAsoft created a demo application that you can use it to test our service.
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        gutterBottom
                    >
                        If you saw any issue, bug or things related, ust open drawer and tap on repost a big. Report it to us!
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomePage;