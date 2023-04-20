import { Container, Typography, Grid } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Grid
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={2}
        container
      >
        <Grid md={6} sm={12} sx={12} item>
          <Typography variant="h3" color="primary" gutterBottom>
            TFAsoft Demo
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            TFAsoft is a moden authentication services.
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            With this service you can test out platform.
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            You can also report bugs!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
