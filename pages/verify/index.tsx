import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useEmailVerify } from '@/hooks/Email/useEmailVerify'
import Error404Page from '@/pages/404'

const Verify = () => {
  const { toggles } = useFeatureToggle()
  const toggleFeature = toggles.dashboard || toggles.bypassPage

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const initialized = useRef(false)

  const { mutate: emailVerify } = useEmailVerify()

  useEffect(() => {
    // Workaround since React StrictMode runs twice in development
    if (initialized.current || !toggleFeature) return
    if (!token) return
    emailVerify({ token })
    initialized.current = true
  }, [emailVerify, token, toggleFeature])

  return (
    <>
      <Head>
        <title>Verify | DeerHacks</title>
      </Head>
      {toggleFeature && token ? <FullPageSpinner /> : <Error404Page noTitle />}
    </>
  )
}

export default Verify
