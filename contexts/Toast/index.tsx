import { createContext, ReactNode, useContext } from 'react'

import { AlertColor } from '@mui/material/Alert'

type Props = {
  type: AlertColor
}

const ToastContext = createContext<Props | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastContext')
  }
  return context
}

export const ToastProvider = (props: { children: ReactNode }) => {
  return <ToastContext.Provider value={{ type: 'success' }}>{props.children}</ToastContext.Provider>
}
