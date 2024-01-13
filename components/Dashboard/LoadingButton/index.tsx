import Button, { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

type Props = {
  loading: boolean
} & ButtonProps

const LoadingButton = (props: Props) => {
  const { loading, children, ...buttonProps } = props

  return (
    <Button
      {...buttonProps}
      variant={buttonProps?.variant || 'contained'}
      disabled={!!buttonProps?.disabled || loading}
      size={buttonProps?.size || 'small'}
      sx={{ position: 'relative', p: '0.5rem 1rem', ...buttonProps?.sx }}
    >
      {children}
      {loading && <CircularProgress size="1.5rem" sx={{ position: 'absolute' }} />}
    </Button>
  )
}

export default LoadingButton
