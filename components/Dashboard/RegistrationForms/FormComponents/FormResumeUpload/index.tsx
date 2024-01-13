import { useRef } from 'react'
import { FieldError } from 'react-hook-form'

import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { APIError } from '@/api/types'
import LoadingButton from '@/components/Dashboard/LoadingButton'
import { useToast } from '@/contexts/Toast'
import { useResumeUpdate } from '@/hooks/Application/useResumeUpdate'
import theme from '@/styles/theme'
import { ResumeUpdateResp } from '@/types/Application'

const MAX_FILE_SIZE = 2000000 // 2 MB
const MAX_UPDATE_COUNT = 3

type Props = {
  name: string
  link: string
  updateCount: number
  error?: FieldError
  onSuccess: (resp: ResumeUpdateResp) => void
}

const FormResumeUpload = (props: Props) => {
  const { name, link, updateCount = 0, error, onSuccess } = props
  const { setToast } = useToast()

  const { isLoading, mutate: updateResume } = useResumeUpdate()

  const inputRef = useRef<HTMLInputElement>(null)

  const onFileSelected = async (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files) return
    const file = e.currentTarget.files[0]
    if (!file) return

    // Reset the input field so that the same file can be handled again
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    const fileName = file.name
    if (fileName.length > 128) {
      setToast({
        type: 'error',
        message: 'File name must be 128 characters or less',
        autoHide: false,
      })
      return
    }

    if (fileName.split('.').pop() !== 'pdf') {
      setToast({
        type: 'error',
        message: 'File type must be PDF',
        autoHide: false,
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setToast({
        type: 'error',
        message: 'Max file size is 2 MB',
        autoHide: false,
      })
      return
    }

    const data = new FormData()
    data.append('file', file)
    updateResume(data, {
      onSuccess: (resp) => {
        // want toast on success so it hides any errors that didn't auto-hide
        if (updateCount === resp.resume_update_count) {
          setToast({
            type: 'info',
            message: 'No changes detected in resume',
          })
        } else {
          setToast({
            type: 'success',
            message: 'Resume successfully uploaded',
          })
          onSuccess(resp)
        }
      },
      onError: (err) => {
        setToast({
          type: 'error',
          message:
            (err as APIError).apiError.status == 400
              ? 'Bad Request. Please review your resume and try again later.'
              : 'Oops, something went wrong. Please try again later.',
          autoHide: false,
        })
      },
    })
  }

  return (
    <>
      <Grid container flexDirection="column">
        <input type="file" ref={inputRef} onChange={onFileSelected} accept=".pdf" hidden />
        <Collapse in={updateCount < MAX_UPDATE_COUNT}>
          <Alert severity="info" sx={{ mb: '1rem' }}>
            <Grid container flexDirection="column">
              {`${MAX_UPDATE_COUNT - updateCount} update(s) remaining (bc we're broke bois).`}
              <Typography color="secondary" variant="caption">
                ACCEPTED FILE FORMAT: PDF - MAX SIZE 2 MB
              </Typography>
            </Grid>
          </Alert>
        </Collapse>
        <Collapse
          in={updateCount > 0}
          sx={{
            width: '100%',
            '& .MuiCollapse-wrapperInner': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            },
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            href={link}
            rel="noopener"
            target="_blank"
            startIcon={<CloudDownloadIcon />}
            sx={{ justifyContent: 'start', borderRadius: '1rem' }}
          >
            <Typography
              variant="button"
              color="text.secondary"
              textAlign="left"
              fontSize="0.75rem"
              noWrap
            >
              Download Resume
              <Typography color="primary" noWrap sx={{ textDecoration: 'underline' }}>
                {name}
              </Typography>
            </Typography>
          </Button>
          {updateCount < MAX_UPDATE_COUNT && (
            <Tooltip title="Upload New Resume">
              <Fab
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
                sx={{ minWidth: '56px', zIndex: 1 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : <UploadFileIcon />}
              </Fab>
            </Tooltip>
          )}
        </Collapse>
        <Collapse in={updateCount == 0}>
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={isLoading}
            disabled={updateCount >= MAX_UPDATE_COUNT}
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
            sx={{
              border: '1px dashed rgba(255, 255, 255, 0.4)',
              ...(error && { border: `1px dashed ${theme.palette.error.main}` }),
              flexDirection: 'column',
              p: '1rem',
            }}
          >
            <CloudUploadIcon fontSize="large" />
            <Typography variant="button">Upload Resume</Typography>
          </LoadingButton>
          {error && <Typography className="formError">{error.message}</Typography>}
        </Collapse>
      </Grid>
    </>
  )
}

export default FormResumeUpload
