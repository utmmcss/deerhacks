import Head from 'next/head'
import Image from 'next/image'

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { usePhotoList } from '@/hooks/Photo/usePhotoList'
import Error500Page from '@/pages/500'
import theme from '@/styles/theme'

const Gallery = () => {
  const { data, isLoading, isError } = usePhotoList()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const tablet = useMediaQuery(theme.breakpoints.up('sm'))

  if (isError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Photo Gallery | DeerHacks</title>
      </Head>
      {isLoading || !data ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start' }}>
            <BackButton navbar />
            <Typography variant="h1">Photo Gallery</Typography>
            <ImageList
              variant="masonry"
              cols={desktop ? 3 : tablet ? 2 : 1}
              gap={8}
              sx={{
                width: '100%',
                columnGap: '1rem !important',
                WebkitMaskImage:
                  '-webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
                maskImage:
                  '-webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
              }}
            >
              {data.data.map((item) => (
                <ImageListItem key={item.id}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DEERHACKS_CMS_BASE_URL}${
                      item.attributes.img.data.attributes.formats.large?.url ??
                      item.attributes.img.data.attributes.url
                    }`}
                    alt={item.attributes.alt}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '1rem',
                    }}
                    draggable={false}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Button
              variant="contained"
              startIcon={<CameraEnhanceIcon />}
              href="https://deerhacks.ca"
              target="_blank"
              rel="noopener"
              disabled
              sx={{ mt: '-4rem' }}
            >
              Share your photos, coming soon!
            </Button>
          </Container>
        </Fade>
      )}
    </>
  )
}

export default Gallery
