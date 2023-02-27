import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/dom/layouts';

import { ProductList } from '@/features/product/components/dom';
import { useProducts } from '@/features/product/hooks';

import { FullScreenLoading } from '@/features/ui';


export const MenPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=men');


  return (
    <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Encuentra los mejores productos de Teslo para ellos'}>
        <Typography variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellos</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

//export default MenPage
