import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'

import theme from '@/styles/theme'

const FullPageSpinner = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        background: theme.palette.background.default,
        position: 'fixed',
        top: 0,
        zIndex: 10000,
      }}
    >
      <CircularProgress />
    </Container>
  )
}

export default FullPageSpinner
