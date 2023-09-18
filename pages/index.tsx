import Head from 'next/head';
import { memo, useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FullPageLoader from '@/components/FullPageLoader';
import MNModel from '@/components/MNModel';
import { useDemoGet } from '@/hooks/useDemoGet';
import AOS from 'aos';

import 'aos/dist/aos.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [animatingLogo, setAnimatingLogo] = useState(true);
  const [renderingModel, setRenderingModel] = useState(true);

  const demo = useDemoGet();

  useEffect(() => {
    if (animatingLogo || renderingModel || demo.isLoading) return;
    setLoading(false);
    AOS.init({
      offset: -120, // offset (in px) from the original trigger point
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 500, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  }, [animatingLogo, renderingModel, demo]);

  return (
    <>
      <Head>
        <title>DeerHacks</title>
      </Head>
      <FullPageLoader loading={loading} onAnimationEnd={() => setAnimatingLogo(false)} />
      {/* Begin model rendering after loading animation ends for smoother transition */}
      {!animatingLogo && <MNModel onAfterRender={() => setRenderingModel(false)} />}
      <Container sx={{ justifyContent: { xs: 'center', sm: 'start' }, alignItems: 'end' }}>
        <Grid container margin="2.5rem 1rem">
          <Typography
            variant="body1"
            fontFamily="monospace"
            data-aos="fade"
            data-aos-delay="1000"
            data-aos-duration="1000"
          >
            deerhacks v3.0.0&nbsp;
          </Typography>
          <Typography
            variant="body1"
            fontFamily="monospace"
            data-aos="fade"
            data-aos-delay="1250"
            data-aos-duration="1250"
          >
            <span style={{ opacity: 0.5 }}>/ coming soon&nbsp;</span>
          </Typography>
          <Typography
            variant="body1"
            fontFamily="monospace"
            data-aos="fade"
            data-aos-delay="1500"
            data-aos-duration="1500"
          >
            <span style={{ opacity: 0.5 }}>/ 02.16.24 - 02.18.24</span>
          </Typography>
        </Grid>
      </Container>
    </>
  );
};

export default memo(Home);
