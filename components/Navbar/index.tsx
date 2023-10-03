import Image from 'next/image';
import { Suspense, useState } from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Slide from '@mui/material/Slide';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

import MLHBadge from '@/components/MLHBadge';
import { useFeatureToggle } from '@/contexts/FeatureToggle';
import theme from '@/styles/theme';

type Props = {
  loading: boolean;
};

type MenuProps = {
  desktop: boolean;
  afterClick: () => void;
};

const Menu = (props: MenuProps) => {
  const { desktop, afterClick } = props;
  const { toggles } = useFeatureToggle();

  const handleClick = (dest: string) => {
    const section = document.querySelector(dest);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    afterClick();
  };

  return (
    <Box
      component="div"
      display="inline-flex"
      flexWrap="wrap"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="center"
      gap={{ xs: '1.5rem', md: '2rem' }}
      p="0.5rem 1rem"
    >
      <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
        <Tooltip title="DeerHacks 2023">
          <Link href="https://2023.deerhacks.ca">2023</Link>
        </Tooltip>
      </Box>
      <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
        <Tooltip title="Instagram">
          <Link href="https://instagram.com/deerhacks" target="_blank" display="flex">
            <InstagramIcon />
          </Link>
        </Tooltip>
      </Box>
      <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
        <Tooltip title="LinkedIn">
          <Link href="https://linkedin.com/showcase/deerhacks" target="_blank" display="flex">
            <LinkedInIcon />
          </Link>
        </Tooltip>
      </Box>
      <Divider variant="middle" orientation={desktop ? 'vertical' : 'horizontal'} />
      <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
        <Button onClick={() => handleClick('#faq')}>FAQ</Button>
      </Box>
      {toggles.mlh && (
        <Box component="div" sx={{ width: 75 }}>
          <Tooltip title="Major League Hacking">
            <Link
              href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=white"
              target="_blank"
              sx={{ width: 75, opacity: 1, position: 'absolute', top: 0 }}
            >
              <MLHBadge />
            </Link>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

const Navbar = (props: Props) => {
  const { loading } = props;

  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container
      sx={{
        position: 'absolute',
        inset: '0 0 auto 0',
        m: '0 auto',
        p: '0 !important',
      }}
    >
      <AppBar position="relative">
        <Grid container justifyContent="space-between">
          <Box
            component="div"
            position="absolute"
            top="2.5rem"
            left={{ xs: '1.5rem', lg: '2.5rem' }}
          >
            <ClickAwayListener onClickAway={() => setTooltip(false)}>
              <Tooltip title="Welcome to DeerHacks!" placement="right" arrow open={tooltip}>
                <Button onClick={() => setTooltip(true)} sx={{ p: '0.5rem', borderRadius: '50%' }}>
                  <Image src="/icons/logo.svg" alt="DeerHacks Logo" width={55} height={55} />
                </Button>
              </Tooltip>
            </ClickAwayListener>
          </Box>
          <span />
          <Slide in={!loading} timeout={500} mountOnEnter>
            <Grid
              item
              p={desktop ? '0.5rem 1rem' : '0.75rem'}
              sx={{
                borderRadius: '1rem',
                backgroundColor: theme.palette.background.default,
              }}
            >
              {desktop ? (
                <Menu desktop afterClick={() => setOpen(false)} />
              ) : (
                <Box component="div" data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
                  <Button
                    onClick={() => setOpen(true)}
                    sx={{ minWidth: 0, borderRadius: '0.5rem', p: '0.5rem' }}
                  >
                    <MenuIcon /> Menu
                  </Button>
                </Box>
              )}
            </Grid>
          </Slide>
        </Grid>
      </AppBar>
      <Suspense>
        <SwipeableDrawer
          open={open}
          variant="temporary"
          anchor="right"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          PaperProps={{
            sx: {
              minWidth: '60vw',
              p: '0 1rem 4rem',
              justifyContent: 'center',
            },
          }}
        >
          <Menu desktop={false} afterClick={() => setOpen(false)} />
        </SwipeableDrawer>
      </Suspense>
    </Container>
  );
};

export default Navbar;
