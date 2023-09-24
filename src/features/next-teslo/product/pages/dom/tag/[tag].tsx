import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '@/features/next-teslo'

import { ProductList } from '@/features/next-teslo'
import { useProducts } from '@/features/next-teslo'

import { FullScreenLoading } from '@/features/next-teslo'

interface Props {
  tags: string[]
}

export const TagPage: NextPage<Props> = ({ tags }) => {
  const { products, isLoading } = useProducts(`/products?tags=${tags}`)
  return (
    <ShopLayout
      title={'Teslo-Shop - Men'}
      pageDescription={'Encuentra los mejores productos de Teslo para las tags pasadas por parametro'}>
      <Typography variant='h1' component='h1'>
        Tags pasadas por parametro
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Productos con las tags pasadas por parametro
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

//export default MenPage
