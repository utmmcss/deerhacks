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
          "linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25) ), url('/photos/2024.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <CardActionArea href="/gallery" LinkComponent={NextLink}>
        <CardContent
          sx={{
            justifyContent: 'end',
            minHeight: resize
              ? { xs: '300px', md: '400px', lg: '500px' }
              : { xs: '300px', md: '250px', lg: '329px' },
          }}
        >
          <Typography
            variant="h1"
            display="flex"
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
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileGallery
