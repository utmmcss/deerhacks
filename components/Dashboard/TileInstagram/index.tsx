import InstagramIcon from '@mui/icons-material/Instagram'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const TileInstagram = () => {
  return (
    <Card>
      <CardActionArea
        rel="noopener"
        href="https://instagram.com/deerhacks"
        target="_blank"
        sx={{
          background:
            'radial-gradient(circle farthest-corner at 5% 95%, #fec564, transparent 40%),radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%),radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%),radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%),radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%),radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent),linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)',
        }}
      >
        <CardContent>
          <Typography variant="h3" display="flex" alignItems="center" gap="0.5rem" gutterBottom>
            <InstagramIcon fontSize="inherit" />
            Instagram
          </Typography>
          <Typography color="text.primary" variant="body2">
            @deerhacks
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileInstagram
