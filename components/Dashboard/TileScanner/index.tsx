import NextLink from 'next/link'

import QrCodeIcon from '@mui/icons-material/QrCode'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const TileScanner = () => {
  return (
    <Card elevation={5}>
      <CardActionArea href="/dashboard/scanner" LinkComponent={NextLink}>
        <CardContent>
          <Typography
            color="primary"
            variant="h2"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
          >
            <QrCodeIcon fontSize="inherit" />
            Staff: QR Scanner
          </Typography>
          <Typography variant="body2">QR Scanner for Sign-ins</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileScanner
