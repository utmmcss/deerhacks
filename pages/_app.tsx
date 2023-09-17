import type { AppProps } from 'next/app';
import Script from 'next/script';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import theme from '@/styles/theme';

/**
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=G-W6CQEYBHZ5"
          />
          <Script id="analytics" strategy="lazyOnload">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-W6CQEYBHZ5', {
                page_path: window.location.pathname,
                });
              `}
          </Script>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
