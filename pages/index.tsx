import Head from 'next/head';
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MNModel from '@/components/MNModel';
import AOS from 'aos';

import 'aos/dist/aos.css';

const Home = () => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) return;
    AOS.init({
      offset: -120, // offset (in px) from the original trigger point
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  }, [rendered]);

  return (
    <>
      <Head>
        <title>DeerHacks</title>
      </Head>
      <MNModel onCreated={() => setRendered(true)} />
      <Container sx={{ justifyContent: { xs: 'center', sm: 'start' }, alignItems: 'end' }}>
        <Typography
          variant="body1"
          fontFamily="monospace"
          margin="3rem 1rem"
          data-aos="fade"
          data-aos-delay="2000"
          data-aos-duration="1000"
        >
          deerhacks v3.0.0{' '}
          <span
            data-aos="fade"
            data-aos-delay="2250"
            data-aos-duration="1000"
            style={{ opacity: 0.5 }}
          >
            / coming soon
          </span>{' '}
          <span
            data-aos="fade"
            data-aos-delay="2500"
            data-aos-duration="1000"
            style={{ opacity: 0.5 }}
          >
            / 02.16.24 - 02.18.24
          </span>
        </Typography>
      </Container>
    </>
  );
};

export default Home;
