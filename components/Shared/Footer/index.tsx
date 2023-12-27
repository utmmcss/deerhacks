import NextLink from 'next/link'

import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

const Footer = () => {
  return (
    <Box component="footer" id="footer">
      <Container sx={{ flexDirection: 'column', pt: 2 }}>
        <Divider />
        <Grid container justifyContent="space-between" alignItems="center" p="1rem 0" gap="2rem">
          <Box
            component="div"
            display="inline-flex"
            gap={{ xs: '1rem 1.5rem', sm: '2rem' }}
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography color="text.primary">DeerHacks © 2024</Typography>
            <Tooltip title="DeerHacks 2023" placement="top">
              <Link rel="noopener" href="https://2023.deerhacks.ca">
                2023
              </Link>
            </Tooltip>
            <Tooltip title="Instagram" placement="top">
              <Link
                rel="noopener"
                href="https://instagram.com/deerhacks"
                target="_blank"
                display="flex"
              >
                <InstagramIcon />
              </Link>
            </Tooltip>
            <Tooltip title="LinkedIn" placement="top">
              <Link
                rel="noopener"
                href="https://linkedin.com/showcase/deerhacks"
                target="_blank"
                display="flex"
              >
                <LinkedInIcon />
              </Link>
            </Tooltip>
            <Tooltip title="Code of Conduct" placement="top">
              <Link href="/code" component={NextLink}>
                Code of Conduct
              </Link>
            </Tooltip>
            <Tooltip title="Privacy Policy" placement="top">
              <Link href="/privacy" component={NextLink}>
                Privacy Policy
              </Link>
            </Tooltip>
          </Box>
          <Box component="div">
            ✨ by&nbsp;
            <Tooltip title="Frontend" placement="top">
              <Link rel="noopener" href="https://github.com/anthonytedja" underline="always">
                Anthony Tedja
              </Link>
            </Tooltip>
            &nbsp;&nbsp;&&nbsp;&nbsp;
            <Tooltip title="Backend" placement="top">
              <Link rel="noopener" href="https://github.com/Multivalence" underline="always">
                Shiva Mulwani
              </Link>
            </Tooltip>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
