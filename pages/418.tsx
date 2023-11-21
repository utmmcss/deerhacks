import Head from 'next/head'

import FullPageLoader from '@/components/Shared/FullPageLoader'

const Error418Page = () => {
  return (
    <>
      <Head>
        <title>418 | DeerHacks</title>
      </Head>
      <FullPageLoader
        show
        pulse={false}
        text="We're still brewing up the page you're looking for."
        buttonText="Go Home"
        buttonLink="/"
      />
    </>
  )
}

export default Error418Page
