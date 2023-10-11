import { Head, Html, Main, NextScript } from 'next/document'

/**
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-document
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://deerhacks.ca" />
        <meta
          name="description"
          content="DeerHacks is University of Toronto Mississauga's annual hackathon! Join 500+ hackers for a weekend of fun :)"
        />
        <meta name="keywords" content="DeerHacks, MCSS, DeerHacks UTM, DeerHacks Hackathon" />
        <meta name="theme-color" content="#181818" />

        <link rel="icon" type="image/svg+xml" sizes="512x512" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/icons/apple.png" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
