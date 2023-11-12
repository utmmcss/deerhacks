import { ReactNode, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'

const states = ['firstUpdate', 'summary', 'name', 'email', 'firstSuccess', 'success'] as const
export type ModalAccountState = (typeof states)[number]

type Props = {
  page: ModalAccountState
  currentState: ModalAccountState
  previousPage?: ModalAccountState[]
  nextPage?: ModalAccountState[]
  disableSlideIn?: boolean
  children: ReactNode
}

const ModalPage = (props: Props) => {
  const { page, currentState, previousPage, nextPage, disableSlideIn, children } = props

  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    if (previousPage?.includes(currentState)) {
      setDirection('left')
    }
    if (nextPage?.includes(currentState)) {
      setDirection('right')
    }
  }, [currentState, nextPage, previousPage])

  if (disableSlideIn && currentState === page) {
    return children
  }

  return (
    <Box component="div" overflow="hidden" {...(currentState !== page && { display: 'none' })}>
      <Slide in={currentState === page} direction={direction} timeout={300}>
        <Box component="div">{children}</Box>
      </Slide>
    </Box>
  )
}

export default ModalPage
