import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/features/next-teslo';

import { ProductList } from '@/features/next-teslo';
import { useProducts } from '@/features/next-teslo';

import { FullScreenLoading } from '@/features/next-teslo';

/**
 * 1) zeppelin con nubes
 * 2) oceano con bolas charls
 * 3) Poner al canvas un height con el scroll que se quiera
 * 
 * 4) Sistema camiseta con decals con imagen que se pueden cargar desde el movil o ordenador y mover el decals para poner el logo en la camiseta, despues esa configuracion es guardada asociada a un producto.
 * producto.model: THREE.Mesh
 * https://codesandbox.io/s/ymb5d9 : Ejemplo decals con r3f (Crear canvas como aplicacion en carpeta a parte para hacerlo widget y app en un futuro)
 * 
 * Crear mis camisetas:
 * https://partner.spreadshirt.es/designs
 */

export const HomePage: NextPage = () => {


  const { products, isLoading } = useProducts('/products');


  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

//export default HomePage
