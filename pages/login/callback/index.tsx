import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useUserLogin } from '@/hooks/Users/useUserLogin'
import Error404Page from '@/pages/404'

const Callback = () => {
  const { toggles } = useFeatureToggle()

  const searchParams = useSearchParams()
  const token = searchParams.get('code')
  const initialized = useRef(false)

  const { mutate: userLogin } = useUserLogin()

  useEffect(() => {
    // Workaround since React StrictMode runs twice in development
    if (initialized.current || !token || !toggles.dashboard) return
    userLogin({ token })
    initialized.current = true
  }, [userLogin, token, toggles.dashboard])

  return (
    <>
      <Head>
        <title>Redirecting | DeerHacks</title>
      </Head>
      {toggles.dashboard && token ? <FullPageSpinner /> : <Error404Page noTitle />}
    </>
  )
}

export default Callback
