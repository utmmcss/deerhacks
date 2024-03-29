import Head from 'next/head'

import FullPageLoader from '@/components/Shared/FullPageLoader'

const Error500Page = () => {
  return (
    <>
      <Head>
        <title>500 | DeerHacks</title>
      </Head>
      <FullPageLoader
        show
        pulse={false}
        text="Oops! Looks like something went wrong."
        buttonText="Go Home"
        buttonLink="/"
      />
    </>
  )
}

export default Error500Page
