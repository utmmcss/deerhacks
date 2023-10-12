import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext } from 'react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useUserGet } from '@/hooks/useUserGet'
import { User } from '@/types/User'

type Props = {
  user?: User
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
  const router = useRouter()
  const { toggles } = useFeatureToggle()

  const { data, isLoading, isSuccess } = useUserGet({
    enabled:
      toggles.registration && router.pathname !== '/' && router.pathname !== '/login/callback',
  })

  const client = {
    user: data?.user,
    loading: isLoading,
    authenticated: isSuccess,
  }

  return <AuthContext.Provider value={client}>{props.children}</AuthContext.Provider>
}
