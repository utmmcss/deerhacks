import Head from 'next/head'

import FullPageLoader from '@/components/Shared/FullPageLoader'

type Props = {
  noTitle?: boolean
}

const Error404Page = (props: Props) => {
  const { noTitle = false } = props
  return (
    <>
      {!noTitle && (
        <Head>
          <title>404 | DeerHacks</title>
        </Head>
      )}
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
