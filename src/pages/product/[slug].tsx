import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';


import { dbProducts } from '@/features/next-teslo';
import { IProduct } from '@/features/next-teslo';

import { ProductPage as ProductPageTeslo } from '@/features/next-teslo';

//const Welcome = dynamic(() => import('@/components/canvas/Welcome'), { ssr: false })
//const ProductScene = dynamic(() => import('@/features/next-teslo/product/components/canvas/product-scene/ProductScene'), { ssr: false })
const ProductPageCanvas = dynamic(() => import('@/features/next-teslo/product/pages/canvas/product/productPageCanvas'), { ssr: false })

interface Props {
  product: IProduct
}


const ProductPage:NextPage<Props> = ({ product }) => {

  
  return (
    <ProductPageTeslo product={product} />
  )
}

// @ts-ignore
ProductPage.canvas = ({ product }) => < ProductPageCanvas product={ product } />


// getServerSideProps 
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//* No usar esto.... SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug( slug );

  // if ( !product ) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

//   return {
//     props: {
//       product
//     }
//   }
// }


// getStaticPaths....
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}



export default ProductPage