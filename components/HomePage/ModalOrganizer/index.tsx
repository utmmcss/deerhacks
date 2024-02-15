import CloseIcon from '@mui/icons-material/Close'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageIcon from '@mui/icons-material/Language'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import theme from '@/styles/theme'

type Props = {
  open: boolean
  onClose: () => void
} & ModalOrganizerProps

export type ModalOrganizerProps = {
  name: string
  description: string
  avatar: string
  emoji: string
  website?: string
  linkedin?: string
  github?: string
}

const ModalOrganizer = (props: Props) => {
  const { open, onClose, name, description, avatar, emoji, website, linkedin, github } = props
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Grow}
      PaperProps={{
        elevation: 2,
        sx: {
          m: '1rem',
          maxHeight: 'calc(100% - 2rem)',
          width: 'calc(100% - 2rem)',
          backgroundImage:
            'radial-gradient(circle closest-corner at 25% 60%, rgba(238, 39, 39, 0.25), rgba(255, 255, 255, 0)), radial-gradient(circle farthest-side at 71% 16%, rgba(154, 39, 238, 0.15), rgba(255, 255, 255, 0) 35%), radial-gradient(circle closest-corner at 32% 38%, rgba(238, 164, 39, 0.1), rgba(255, 255, 255, 0) 76%), radial-gradient(circle farthest-side at 69% 81%, rgba(255, 0, 48, 0.1), rgba(255, 255, 255, 0) 76%), linear-gradient(#202124, #202124)',
        },
      }}
      maxWidth="sm"
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          display: 'flex',
          gap: '1rem 1.5rem',
          p: '3rem 2.5rem',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          component="div"
          display="inline-flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar sx={{ bgcolor: theme.palette.background.default }}>{emoji}</Avatar>
            }
          >
            <Avatar
              src={avatar}
              alt={name}
              sx={{
                width: 125,
                height: 125,
                color: 'white',
                bgcolor: theme.palette.background.default,
                border: `6px solid ${theme.palette.background.default}`,
                filter: 'saturate(0.9)',
              }}
            />
          </Badge>
          {(website || linkedin || github) && (
            <Box component="div" display="inline-flex" gap="1rem">
              {website && (
                <Tooltip title="Website" placement="top">
                  <Link rel="noopener" href={website} target="_blank" display="flex">
                    <LanguageIcon />
                  </Link>
                </Tooltip>
              )}
              {github && (
                <Tooltip title="GitHub" placement="top">
                  <Link rel="noopener" href={github} target="_blank" display="flex">
                    <GitHubIcon />
                  </Link>
                </Tooltip>
              )}
              {linkedin && (
                <Tooltip title="LinkedIn" placement="top">
                  <Link rel="noopener" href={linkedin} target="_blank" display="flex">
                    <LinkedInIcon />
                  </Link>
                </Tooltip>
              )}
            </Box>
          )}
        </Box>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          textAlign={{ xs: 'center', sm: 'start' }}
          gap="0.25rem"
        >
          <Typography variant="h2" gutterBottom>
            {name}
          </Typography>
          <Typography>{description}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ModalOrganizer
