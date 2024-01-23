import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Stats = () => {
  return (
    <Container id="stats" sx={{ textAlign: 'center' }}>
      <Grid container rowSpacing={2} py={2}>
        <Grid
          item
          xs={6}
          md={3}
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-once="false"
        >
          <Typography variant="h1" mb="0 !important">
            1000+
          </Typography>
          <Typography variant="body1">Applicants</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={3}
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="100"
          data-aos-once="false"
        >
          <Typography variant="h1" mb="0 !important">
            25+
          </Typography>
          <Typography variant="body1">Events</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={3}
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="150"
          data-aos-once="false"
        >
          <Typography variant="h1" mb="0 !important">
            50+
          </Typography>
          <Typography variant="body1">Organizers</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={3}
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="200"
          data-aos-once="false"
        >
          <Typography variant="h1" mb="0 !important">
            40+
          </Typography>
          <Typography variant="body1">Countries</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Stats
