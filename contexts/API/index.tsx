import { createContext, ReactNode, useContext } from 'react'

import { API } from '@/api/client'
import { config } from '@/api/schema'
import useFetch from '@/api/useFetch'
import { QueryClientProvider } from '@tanstack/react-query'

type Endpoints = ReturnType<typeof config>
type Props = API<Endpoints>

const APIContext = createContext<Props | undefined>(undefined)

export const useAPI = () => {
  const context = useContext(APIContext)
  if (!context) {
    throw new Error('useAPI must be used within APIProvider')
  }
  return context
}

export const APIProvider = (props: { children: ReactNode }) => {
  const client = new API(config(useFetch()))

  return (
    <QueryClientProvider client={client.queryClient}>
      <APIContext.Provider value={client}>{props.children}</APIContext.Provider>
    </QueryClientProvider>
  )
}
