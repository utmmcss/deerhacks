import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'

import { useUserGet } from '@/hooks/useUserGet'
import { User } from '@/types/User'

type Props = {
  user: User
  /**
   * Get the User object when we need authentication
   */
  getUser: () => void
  loading: boolean
  authenticated: boolean
}

const AuthContext = createContext<Props | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = (props: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [getUser, setGetUser] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const userGet = useUserGet(
    { token: searchParams.get('token') || undefined },
    {
      enabled: getUser,
      onSuccess: () => setAuthenticated(true),
      onError: () => {
        setAuthenticated(false)
        router.push('/')
      },
    }
  )

  const client = {
    user: userGet.data!.user,
    getUser: () => setGetUser(true),
    loading: userGet.isLoading,
    authenticated,
  }

  return <AuthContext.Provider value={client}>{props.children}</AuthContext.Provider>
}
