import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box component="footer">
      <Container sx={{ flexDirection: 'column' }}>
        <Divider />
        <Grid container justifyContent="space-between" alignItems="center" p="1rem 0">
          <Box component="div" display="inline-flex" gap="2rem">
            <Typography color="secondary" variant="body1" display={{ xs: 'none', sm: 'initial' }}>
              DeerHacks © 2024
            </Typography>
            <Link href="https://2023.deerhacks.ca">2023</Link>
          </Box>
          <Box component="div" display="inline-flex">
            ✨ by&nbsp;
            <Link href="https://github.com/anthonytedja" underline="always">
              Anthony Tedja
            </Link>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
