import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/features/next-teslo';

import { ProductList } from '@/features/next-teslo';
import { useProducts } from '@/features/next-teslo';

import { FullScreenLoading } from '@/features/next-teslo';


export const WomenPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=women');


  return (
    <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para ellas'}>
        <Typography variant='h1' component='h1'>Mujeres</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellas</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

//export default WomenPage
