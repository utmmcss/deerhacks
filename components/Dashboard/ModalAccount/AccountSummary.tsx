import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { User } from '@/types/User'

type Props = {
  user: User
  onClickName: () => void
  onClickEmail: () => void
}
const AccountSummary = (props: Props) => {
  const { user, onClickName, onClickEmail } = props

  return (
    <Grid display="flex" flexDirection="column" gap="1rem">
      <Grid>
        <Typography>Name:</Typography>
        <Button fullWidth onClick={onClickName} endIcon={<NavigateNextIcon />}>
          <Grid
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">{`${user.first_name} ${user.last_name}`}</Typography>
          </Grid>
        </Button>
      </Grid>
      <Grid>
        <Typography>Email:</Typography>
        <Button fullWidth onClick={onClickEmail} endIcon={<NavigateNextIcon />}>
          <Grid
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">{user.email}</Typography>
            {user.status === 'pending' ? (
              <Chip label="unverified" color="warning" style={{ height: 'auto', width: 'auto' }} />
            ) : (
              <Chip label="verified" color="success" style={{ height: 'auto', width: 'auto' }} />
            )}
          </Grid>
        </Button>
      </Grid>
    </Grid>
  )
}

export default AccountSummary
