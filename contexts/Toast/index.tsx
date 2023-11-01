import { createContext, ReactNode, useContext } from 'react'

type Props = {
  type: ToastType
}

export type ToastType = 'success' | 'info' | 'warning' | 'error'

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
