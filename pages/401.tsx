import Head from 'next/head'

import FullPageLoader from '@/components/Shared/FullPageLoader'

const Error401Page = () => {
  return (
    <>
      <Head>
        <title>401 | DeerHacks</title>
      </Head>
      <FullPageLoader
        show
        pulse={false}
        text="Unauthorized, please login."
        buttonText="Go Home"
        buttonLink="/"
      />
    </>
  )
}

export default Error401Page
