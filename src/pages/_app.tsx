import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import '@/styles/globals.css'

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SWRConfig } from 'swr';


import { SessionProvider } from 'next-auth/react'


import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../features/next-teslo/material-ui/themes';


import { CartProvider } from '@/features/next-teslo'
import { UiProvider } from '@/features/next-teslo'
import { AuthProvider } from '@/features/next-teslo'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ErrorBoundary } from 'react-error-boundary'

import { queryClient } from '@/features/next-teslo';


// TODO: Crear un fichero global para las constantes como esta
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  return (
    <>
      <SessionProvider>
        <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
          <SWRConfig
            value={{
              fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}>
            <QueryClientProvider client={queryClient}>
              {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
              <ErrorBoundary fallback={<div>Something went wrong!</div>} onError={console.error}>
                <Header title={pageProps.title} />
                <Layout ref={ref}>
                  <AuthProvider>
                    <CartProvider>
                      <UiProvider>
                        <ThemeProvider theme={lightTheme}>
                          <CssBaseline />
                          <Component {...pageProps} />
                        </ThemeProvider>

                        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
                         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
                         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
                        {/* 
                            {Component?.canvas && (
                              <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
                                {Component.canvas(pageProps)}
                              </Scene>
                            )} 
                        */}

                        <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
                          {Component?.canvas && Component.canvas(pageProps)}
                        </Scene>
                      </UiProvider>
                    </CartProvider>
                  </AuthProvider>
                </Layout>
              </ErrorBoundary>
            </QueryClientProvider>
          </SWRConfig>
        </PayPalScriptProvider>
      </SessionProvider>
    </>
  )
}
