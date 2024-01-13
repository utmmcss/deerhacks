import { Suspense, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Modal from '@/components/Dashboard/Modal'

type Props = {
  value: string
  onSubmit: (newValue: string) => void
  name: string
  originalValue: string
  disabled?: boolean
}

const InternalNotesField = (props: Props) => {
  const { value, onSubmit, name, originalValue, disabled = false } = props

  const [open, setOpen] = useState(false)
  const [newValue, setNewValue] = useState(value)

  return (
    <>
      <Tooltip
        title={value ? <span style={{ whiteSpace: 'pre-wrap' }}>{value}</span> : ''}
        placement="bottom-start"
      >
        <span style={{ width: '100%', height: '100%' }}>
          <Button
            onClick={() => {
              setNewValue(value)
              setOpen(true)
            }}
            sx={{
              height: '100%',
              padding: '0.5rem',
            }}
            fullWidth
            disabled={disabled}
          >
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflowWrap: 'break-word',
                overflow: 'hidden',
              }}
              whiteSpace="pre-wrap"
              fontSize="0.75rem"
              width="100%"
              height="100%"
              textAlign="start"
              color="white"
            >
              {value}
            </Typography>
          </Button>
        </span>
      </Tooltip>
      <Suspense>
        <Modal
          open={open}
          title={`Internal Notes - ${name}`}
          onClose={() => setOpen(false)}
          primaryButton={{
            text: 'Done',
            onClick: () => {
              onSubmit(newValue)
              setOpen(false)
            },
          }}
          secondaryButton={{
            text: 'Undo Changes',
            onClick: () => setNewValue(originalValue),
            disabled: newValue === originalValue,
          }}
          disableRestoreFocus
        >
          <TextField
            multiline
            minRows={3}
            inputProps={{ sx: { fontSize: '0.75rem', overflow: 'auto' } }}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            disabled={disabled}
            autoFocus
          />
        </Modal>
      </Suspense>
    </>
  )
}
export default InternalNotesField
