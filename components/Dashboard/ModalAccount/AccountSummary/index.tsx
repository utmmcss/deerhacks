import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import DialogContent from '@mui/material/DialogContent'
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
    <DialogContent sx={{ p: '1rem 1.5rem 1.5rem' }}>
      <Box component="div" display="flex" flexDirection="column" gap="1.5rem">
        <Box component="div">
          <Typography>Name</Typography>
          <Button
            fullWidth
            onClick={onClickName}
            endIcon={<EditIcon />}
            sx={{
              mt: '0.5rem',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              p: '0.75rem 0.25rem 0.75rem 0',
              '&:hover, &:focus-visible': {
                p: '0.75rem 1rem',
              },
            }}
          >
            <Typography variant="h3" noWrap>{`${user.first_name} ${user.last_name}`}</Typography>
          </Button>
        </Box>
        <Box component="div">
          <Box component="div" display="flex" alignItems="center" gap="1rem">
            <Typography>Email</Typography>
            <Chip
              {...(user.status === 'pending'
                ? { label: 'unverified', color: 'warning' }
                : { label: 'verified', color: 'success' })}
              sx={{ height: '28px' }}
            />
          </Box>
          <Button
            fullWidth
            onClick={onClickEmail}
            endIcon={<EditIcon />}
            sx={{
              mt: '0.5rem',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              p: '0.75rem 0.25rem 0.75rem 0',
              '&:hover, &:focus-visible': {
                p: '0.75rem 1rem',
              },
            }}
          >
            <Typography variant="h3" noWrap>
              {user.email}
            </Typography>
          </Button>
        </Box>
      </Box>
    </DialogContent>
  )
}

export default AccountSummary
