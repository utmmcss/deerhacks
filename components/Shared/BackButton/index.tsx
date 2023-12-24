import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Navbar from '@/components/Shared/Navbar'

type Props = {
  href?: string
  text?: string
  navbar?: boolean
}

const BackButton = (props: Props) => {
  const { href, text, navbar = false } = props
  const router = useRouter()
  const [hasHistory, setHasHistory] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.history.length > 2) {
      setHasHistory(true)
    }
  }, [])

  const onClick = () => {
    if (href) {
      router.push(href)
    } else if (hasHistory) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return navbar && !href && !hasHistory ? (
    <Navbar />
  ) : (
    <Box component="div" sx={{ width: navbar ? '100%' : 'initial' }}>
      <Button
        onClick={onClick}
        startIcon={<ChevronLeftRoundedIcon />}
        sx={{ gap: 0, p: '0.75rem 1.125rem 0.75rem 1rem' }}
      >
        {text ?? (hasHistory ? 'Go Back' : 'Go Home')}
      </Button>
    </Box>
  )
}

export default BackButton
