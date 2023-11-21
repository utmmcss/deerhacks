import { Suspense, useState } from 'react'

import ChecklistIcon from '@mui/icons-material/Checklist'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import ModalChecklist from '@/components/Dashboard/ModalChecklist'
import { UserStatus } from '@/types/User'

type Props = {
  status: UserStatus
}

const TileChecklist = (props: Props) => {
  const { status } = props

  const [open, setOpen] = useState(false)

  const disabled = !['admin', 'moderator', 'volunteer', 'accepted', 'attended'].includes(status)

  return (
    <>
      <Card variant={disabled ? 'outlined' : 'elevation'} elevation={disabled ? 0 : 5}>
        <CardActionArea disabled={disabled} onClick={() => setOpen(true)}>
          <CardContent>
            <Typography
              variant="h3"
              display="flex"
              alignItems="center"
              gap="0.5rem"
              gutterBottom
              color={disabled ? 'text.disabled' : 'text.primary'}
            >
              <ChecklistIcon color="success" fontSize="inherit" />
              Checklist
            </Typography>
            <Typography variant="body2">
              {disabled ? 'Coming Soon' : 'DeerHacks Checklist'}
            </Typography>
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
