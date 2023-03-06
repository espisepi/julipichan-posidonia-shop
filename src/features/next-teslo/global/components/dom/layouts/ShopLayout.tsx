import { FC, useContext } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu, UiContext } from '@/features/next-teslo';
import { Button } from '@mui/material';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: React.ReactNode;
}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    // Poner aqui salir modo 3d
    const { is3DModeActivated, toggle3DMode } = useContext(UiContext);
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head> 

        <nav>
            <Navbar />
        </nav>

        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
                <div style={{position:'fixed', bottom: 0}}>
                 <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={ toggle3DMode }
                  >
                    { is3DModeActivated ? 'Salir del modo 3D' : 'Entrar al modo 3D' }
                  </Button>

                </div>
        </footer>

    </>
  )
}


