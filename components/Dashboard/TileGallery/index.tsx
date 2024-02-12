import NextLink from 'next/link'

import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

type Props = {
  resize?: boolean
}

const TileGallery = (props: Props) => {
  const { resize = false } = props

  return (
    <Card
      elevation={0}
      {...(resize && {
        'data-aos': 'zoom-out',
        'data-aos-offset': '25',
        'data-aos-once': 'false',
      })}
      sx={{
        width: '100%',
        background:
          "linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), url('/photos/2023.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CardActionArea href="/gallery" LinkComponent={NextLink}>
        <CardContent
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: resize ? { xs: '300px', md: '400px', lg: '500px' } : '329px',
          }}
        >
          <Typography
            variant="h1"
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="0.5rem"
            mb="0 !important"
            {...(resize && {
              'data-aos': 'fade',
              'data-aos-offset': '25',
              'data-aos-once': 'false',
            })}
          >
            <CameraEnhanceIcon fontSize="inherit" />
            Gallery
          </Typography>
          <Typography
            color="text.primary"
            variant="body2"
            textAlign="center"
            {...(resize && {
              'data-aos': 'fade',
              'data-aos-offset': '25',
              'data-aos-once': 'false',
            })}
          >
            DeerHacks in photos, contributed by you!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileGallery
