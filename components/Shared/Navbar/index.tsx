import Image from 'next/image'
import NextLink from 'next/link'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Navbar = () => {
  return (
    <AppBar position="relative" elevation={0}>
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Button href="/" component={NextLink} sx={{ p: '0 0.5rem 0 0' }}>
          <Image src="/icons/neon.png" alt="DeerHacks Logo" width={80} height={80} priority />
          DeerHacks
        </Button>
      </Box>
    </AppBar>
  )
}

export default Navbar
