import { GetServerSideProps, NextPage } from 'next'

import { IProduct } from '@/features/next-teslo';
import { dbProducts } from '@/features/next-teslo';
import { Product } from '@/features/next-teslo'
import { ProductPageAdmin } from '@/features/next-teslo';

interface Props {
    product: IProduct;
}

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  return <ProductPageAdmin product={product} />
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    let product: IProduct | null;

    if ( slug === 'new' ) {
        // crear un producto
        const tempProduct = JSON.parse( JSON.stringify( new Product() ) );
        delete tempProduct._id;
        tempProduct.images = ['img1.jpg','img2.jpg'];
        product = tempProduct;

    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage