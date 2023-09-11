import { Head, Html, Main, NextScript } from 'next/document';

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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
