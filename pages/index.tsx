import Head from 'next/head'
import { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'

import TileGallery from '@/components/Dashboard/TileGallery'
import About from '@/components/HomePage/About'
import FAQ from '@/components/HomePage/FAQ'
import MNModel from '@/components/HomePage/MNModel'
import Navbar from '@/components/HomePage/Navbar'
import Sponsors from '@/components/HomePage/Sponsors'
import DeerHacksTitle from '@/components/Shared/DeerHacksTitle'
import FullPageLoader from '@/components/Shared/FullPageLoader'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import theme from '@/styles/theme'
import AOS from 'aos'

import 'aos/dist/aos.css'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [animatingLogo, setAnimatingLogo] = useState(true)
  const [renderingModel, setRenderingModel] = useState(true)

  const { toggles } = useFeatureToggle()

  useEffect(() => {
    if (animatingLogo || renderingModel) return
    setLoading(false)
    AOS.init({
      offset: 0, // offset (in px) from the original trigger point
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    })
  }, [animatingLogo, renderingModel])

  return (
    <>
      <Head>
        <title>DeerHacks</title>
      </Head>
      <FullPageLoader
        show={loading}
        onAnimationEnd={() => setAnimatingLogo(false)}
        showTips
        showLoadingText
      />
      {/* Begin model rendering after loading animation ends for smoother transition */}
      {!animatingLogo && <MNModel onAfterRender={() => setRenderingModel(false)} />}
      {!loading && (
        <>
          <Navbar loading={loading} />
          <Container
            sx={{
              position: 'absolute',
              inset: 'auto 0 0 0',
              m: '0 auto',
              p: '0 !important',
            }}
          >
            <Grid container alignItems="stretch">
              <Slide in={!loading} direction="up" timeout={1000} mountOnEnter>
                <Grid
                  item
                  xs={10}
                  sm="auto"
                  p={{ xs: '1rem 1rem 2rem', sm: '1.5rem 2rem' }}
                  sx={{
                    borderRadius: '1rem',
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    variant="body1"
                    letterSpacing={1.5}
                    textAlign="center"
                  >
                    {toggles.mlh ? (
                      <>
                        <span
                          data-aos="fade"
                          data-aos-delay="1000"
                          data-aos-duration="1000"
                          style={{ color: 'white' }}
                        >
                          deerhacks&nbsp;
                        </span>
                        <span data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
                          / MLH partnered event&nbsp;
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          data-aos="fade"
                          data-aos-delay="1000"
                          data-aos-duration="1000"
                          style={{ color: 'white' }}
                        >
                          deerhacks v3.0.0&nbsp;
                        </span>
                        <span data-aos="fade" data-aos-delay="1250" data-aos-duration="1250">
                          / coming soon&nbsp;
                        </span>
                      </>
                    )}
                    <span data-aos="fade" data-aos-delay="1500" data-aos-duration="1500">
                      / 02.16.24 - 02.18.24
                    </span>
                  </Typography>
                </Grid>
              </Slide>
            </Grid>
          </Container>
          <Container
            data-aos="zoom-out"
            data-aos-offset="100"
            data-aos-once="false"
            sx={{ pt: '1rem', pb: { xs: '1rem', md: 0 } }}
          >
            <DeerHacksTitle />
          </Container>
          <About />
          <Sponsors />
          <Container>
            <TileGallery resize />
          </Container>
          <FAQ />
        </>
      )}
    </>
  )
}

export default HomePage
