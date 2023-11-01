import Head from 'next/head'

import FullPageLoader from '@/components/Shared/FullPageLoader'

const Error404Page = () => {
  return (
    <>
      <Head>
        <title>404 | DeerHacks</title>
      </Head>
      <FullPageLoader
        show
        pulse={false}
        text="Oops! Looks like this page doesn't exist."
        buttonText="Go Home"
        buttonLink="/"
      />
    </>
  )
}

export default Error404Page
