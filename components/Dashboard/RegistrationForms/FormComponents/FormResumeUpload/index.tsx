import { useRef } from 'react'
import { FieldError } from 'react-hook-form'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import LoadingButton from '@/components/Dashboard/LoadingButton'
import { useToast } from '@/contexts/Toast'
import { useResumeUpdate } from '@/hooks/Application/useResumeUpdate'
import { ResumeGetResp } from '@/types/Application'

const MAX_FILE_SIZE = 2000000 // 2MB
const MAX_UPDATE_COUNT = 3

type Props = {
  name: string
  link: string
  updateCount: number
  error?: FieldError
  onSuccess: (resp: ResumeGetResp) => void
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
        message: 'File type must be a pdf',
        autoHide: false,
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setToast({
        type: 'error',
        message: 'File size must be less than 2MB',
        autoHide: false,
      })
      return
    }

    const data = new FormData()
    data.append('file', file)
    updateResume(data, {
      onSuccess: (resp) => {
        onSuccess(resp)
        // want toast on success so it hides any errors that didn't auto-hide
        setToast({
          type: 'success',
          message: 'Resume successfully uploaded',
        })
      },
      onError: () => {
        setToast({
          type: 'error',
          message: 'something went wrong :(',
          autoHide: false,
        })
      },
    })
  }

  return (
    <Box component="div">
      <Box component="div">
        <input type="file" ref={inputRef} onChange={onFileSelected} accept=".pdf" hidden />
        <LoadingButton
          loading={isLoading}
          onClick={(e) => {
            e.stopPropagation()
            inputRef.current?.click()
          }}
          disabled={updateCount >= MAX_UPDATE_COUNT}
        >
          Upload Resume
        </LoadingButton>
        <Typography>{MAX_UPDATE_COUNT - updateCount} uploads left</Typography>
      </Box>
      <Link href={link} rel="noopener" target="_blank">
        {name}
      </Link>
      {error && <Typography color="error">{error.message}</Typography>}
    </Box>
  )
}

export default FormResumeUpload
