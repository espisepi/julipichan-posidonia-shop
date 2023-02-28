import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { dbOrders } from '@/features/next-teslo';
import { IOrder } from '@/features/next-teslo';

import { OrderPage as OrderPageTeslo } from '@/features/next-teslo';



interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

  return (
    <OrderPageTeslo order={order} />
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if ( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}


export default OrderPage;