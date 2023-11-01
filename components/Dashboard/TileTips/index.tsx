import HelpIcon from '@mui/icons-material/Help'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const TileTips = () => {
  return (
    <Card sx={{ backgroundColor: '#e9e9e9' }}>
      <CardActionArea onClick={() => null}>
        <CardContent>
          <Typography
            variant="h3"
            color="common.black"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            gutterBottom
          >
            <HelpIcon fontSize="inherit" />
            Tips
          </Typography>
          <Typography color="common.black" variant="body2">
            DeerHacks Dashboard 101
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TileTips
