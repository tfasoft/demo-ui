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
            دمو سرویس آتنتیکیشن
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            سرویس آتنتیکیشن TFASoft یک سرویس مدرن میباشد که به شما امکان احراز
            هویت با اکانت تلگرام خود را میدهد. یکی از کامن ترین نحوه احراز هویت،
            احراز هویت گوگل میباشد.
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            در اینجا شما میتوانید سرویس ما را تست کنید، در صورت مشاهده هر گونه
            مشکل به ما اطلاع دهید تا به ما در بهبود این سرویس کمک کنید.
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            برای ارسال فیدبک و یا اطلاع رسانی ایرادات، از منو وارد بخش گزارش
            شوید و یک پیام برای ما ارسال کنید. با تشکر.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
