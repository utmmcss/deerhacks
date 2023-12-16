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
          content="DeerHacks is the largest annual hackathon at University of Toronto Mississauga. Join 500+ hackers on February 16-18, 2024 for a weekend of prizes, development, and innovation!"
        />
        <meta name="keywords" content="DeerHacks, MCSS, DeerHacks UTM, DeerHacks Hackathon" />
        <meta name="theme-color" content="#181818" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="DeerHacks" />
        <meta
          property="og:description"
          content="DeerHacks is the largest annual hackathon at University of Toronto Mississauga. Join 500+ hackers on February 16-18, 2024 for a weekend of prizes, development, and innovation!"
        />
        <meta property="og:image" content="/backgrounds/collage_close.jpg" />
        <meta property="twitter:image" content="/backgrounds/collage_close.jpg" />
        <meta name="twitter:card" content="summary_large_image" />

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
