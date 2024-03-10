import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const TileLinkedIn = () => {
  return (
    <Card>
      <CardActionArea
        rel="noopener"
        href="https://linkedin.com/company/deerhacks"
        target="_blank"
        sx={{ background: '#0a66c2' }}
      >
        <CardContent>
          <Typography variant="h3" display="flex" alignItems="center" gap="0.5rem" gutterBottom>
            <LinkedInIcon fontSize="inherit" />
            LinkedIn
          </Typography>
          <Typography color="text.primary" variant="body2">
            @deerhacks
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileLinkedIn
