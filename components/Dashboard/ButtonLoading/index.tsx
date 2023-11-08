import Button, { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

type Props = {
  isLoading: boolean
} & ButtonProps

const ButtonLoading = (props: Props) => {
  const { isLoading, ...buttonProps } = props

  return (
    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid sx={{ m: 1, position: 'relative' }}>
        <Button {...buttonProps} disabled={buttonProps?.disabled || isLoading} />
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default ButtonLoading
