import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat'
import BadgeIcon from '@mui/icons-material/Badge'
import BatteryStdIcon from '@mui/icons-material/BatteryStd'
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded'
import CleanHandsRoundedIcon from '@mui/icons-material/CleanHandsRounded'
import CloseIcon from '@mui/icons-material/Close'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded'
import LaptopRoundedIcon from '@mui/icons-material/LaptopRounded'
import LockIcon from '@mui/icons-material/Lock'
import PowerIcon from '@mui/icons-material/Power'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import InfoCheckbox from '@/components/Dashboard/ModalChecklist/InfoCheckbox'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalChecklist = (props: Props) => {
  const { open, setOpen } = props

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Grow}
      PaperProps={{
        sx: {
          m: '1rem',
          maxHeight: 'calc(100% - 2rem)',
          width: 'calc(100% - 2rem)',
          backgroundImage:
            'radial-gradient(circle farthest-side at 70% 82%, rgb(255 0 33 / 17%), rgba(255, 255, 255, 0) 67%),radial-gradient(circle farthest-side at 58% 0%, rgb(147 0 255 / 20%), rgba(255, 255, 255, 0) 82%),radial-gradient(circle farthest-side at 48% 29%, rgb(222 162 0 / 24%), rgba(255, 255, 255, 0) 65%),radial-gradient(circle farthest-side at 24% 80%, rgb(0 255 158 / 5%), rgba(255, 255, 255, 0) 54%),linear-gradient(hsl(225 6% 10% / 1), #202124)',
        },
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>DH Checklist</DialogTitle>
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '1rem' }}>
        <Typography variant="h3">Event Requirements</Typography>
        <FormGroup>
          <InfoCheckbox
            checked
            icon={<EmojiEmotionsIcon />}
            label="Your Cute Self"
            tooltip="You already got that covered ;)"
          />
          <InfoCheckbox
            icon={<BadgeIcon />}
            label="Identification"
            tooltip="Registration requires at least one government issued identification, such as a drivers license, health card, or passport"
          />
          <InfoCheckbox
            icon={<SmartphoneIcon />}
            label="Smartphone"
            tooltip="Sign-ins require you to show your QR code embedded in your dashboard avatar"
          />
        </FormGroup>
        <Typography variant="h3">General</Typography>
        <FormGroup>
          <InfoCheckbox icon={<LaptopRoundedIcon />} label="Laptop / Tablet" />
          <InfoCheckbox icon={<PowerIcon />} label="Chargers / Power Bank" />
          <InfoCheckbox icon={<HeadphonesRoundedIcon />} label="Headphones" />
          <InfoCheckbox icon={<BatteryStdIcon />} label="Water Bottle" />
          <InfoCheckbox
            icon={<LockIcon />}
            label="Padlock"
            tooltip="Secure your belongings! DeerHacks is not responsible for any lost or damaged items"
          />
        </FormGroup>
        <Typography variant="h3">Overnight</Typography>
        <FormGroup>
          <InfoCheckbox
            icon={<CleanHandsRoundedIcon />}
            label="Personal Care Products"
            tooltip="Please please please please please please please please please please please please"
          />
          <InfoCheckbox
            icon={<AirlineSeatFlatIcon />}
            label="Sleeping Bag / Blanket"
            tooltip="DeerHacks will have designated sleeping rooms but you can doze off anywhere within the venue"
          />
          <InfoCheckbox icon={<CheckroomRoundedIcon />} label="Change of Clothes" />
        </FormGroup>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChecklist
