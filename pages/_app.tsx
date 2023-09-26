import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Script from 'next/script';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import Footer from '@/components/Footer';
import { FeatureToggleProvider } from '@/contexts/FeatureToggle';
import { APIProvider } from '@/contexts/useAPI';
import theme from '@/styles/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

/**
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <APIProvider>
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
            <style global jsx>
              {`
                body,
                body * {
                  font-family: ${poppins.style.fontFamily} !important;
                }
              `}
            </style>
            <FeatureToggleProvider>
              <Component {...pageProps} />
              <Footer />
            </FeatureToggleProvider>
          </CssBaseline>
        </ThemeProvider>
      </StyledEngineProvider>
      {<ReactQueryDevtools />}
    </APIProvider>
  );
}
