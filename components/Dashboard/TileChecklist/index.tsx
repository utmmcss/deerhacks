import { Suspense, useState } from 'react'

import ChecklistIcon from '@mui/icons-material/Checklist'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import ModalChecklist from '@/components/Dashboard/ModalChecklist'

const TileChecklist = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        elevation={5}
        sx={{
          backgroundImage:
            'radial-gradient(circle farthest-side at 70% 82%, rgb(191 184 255 / 15%), rgba(255, 255, 255, 0) 67%),radial-gradient(circle farthest-side at 20% 20%, rgb(202 163 195 / 20%), rgba(255, 255, 255, 0) 54%),linear-gradient(hsl(225deg 7.31% 18.42%), #202124)',
        }}
      >
        <CardActionArea onClick={() => setOpen(true)}>
          <CardContent>
            <Typography variant="h3" display="flex" alignItems="center" gap="0.5rem" gutterBottom>
              <ChecklistIcon color="success" fontSize="inherit" />
              Checklist
            </Typography>
            <Typography variant="body2">DeerHacks Checklist</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Suspense>
        <ModalChecklist open={open} setOpen={setOpen} />
      </Suspense>
    </>
  )
}

export default TileChecklist
