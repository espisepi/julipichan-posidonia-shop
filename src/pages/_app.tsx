import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'

import { SessionProvider } from 'next-auth/react'


import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../material-ui/themes';


import { CartProvider } from '@/features/cart'
import { UiProvider } from '@/features/ui'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  return (
    <>
    <SessionProvider>
      <Header title={pageProps.title} />
      <Layout ref={ref}>

        <CartProvider>
          <UiProvider>

          <ThemeProvider theme={ lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>

          {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
          * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
          * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
          {Component?.canvas && (
            <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
              {Component.canvas(pageProps)}
            </Scene>
          )}

          </UiProvider>
        </CartProvider>

      </Layout>
    </SessionProvider>
    </>
  )
}
