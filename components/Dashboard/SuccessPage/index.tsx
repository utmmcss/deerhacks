import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AnimatedSuccess from '@/components/Shared/AnimatedSuccess'

type Props = {
  show?: boolean
  heading: string
  children: ReactNode
}

const SuccessPage = (props: Props) => {
  const { show = false, heading, children } = props

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      textAlign="center"
    >
      <AnimatedSuccess show={show} />
      <Typography variant="h2">{heading}</Typography>
      {children}
    </Box>
  )
}

export default SuccessPage
