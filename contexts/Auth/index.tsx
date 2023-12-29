import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext } from 'react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useUserGet } from '@/hooks/User/useUserGet'
import { User } from '@/types/User'

type Props = {
  user?: User
  loading: boolean
  authenticated: boolean
}

const AuthContext = createContext<Props | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = (props: { children: ReactNode }) => {
  const router = useRouter()
  const { toggles } = useFeatureToggle()

  const { data, isLoading, isSuccess } = useUserGet({
    enabled:
      (toggles.bypassPage || toggles.dashboard) &&
      (router.pathname.includes('dashboard') || router.pathname === '/login'),
    onError: () => {
      if (router.pathname === '/login') return
      router.push('/login?context=auth')
    },
  })

  const client = {
    user: data?.user,
    loading: isLoading,
    authenticated: isSuccess,
  }

  return <AuthContext.Provider value={client}>{props.children}</AuthContext.Provider>
}
