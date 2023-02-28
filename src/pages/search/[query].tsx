import type { NextPage, GetServerSideProps } from 'next';

import { dbProducts } from '@/features/next-teslo';
import { IProduct } from '@/features/next-teslo';

import { SearchPage as SearchPageTeslo } from '@/features/next-teslo';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


  return (
    <SearchPageTeslo products={products} foundProducts={foundProducts} query={query} />
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('shirt');
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default SearchPage
