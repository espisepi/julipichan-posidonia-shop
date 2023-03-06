import { GetServerSideProps, NextPage } from 'next';

import { dbOrders } from '@/features/next-teslo';
import { IOrder } from '@/features/next-teslo';
import { OrderPageAdmin } from '@/features/next-teslo';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

  return (
    <OrderPageAdmin order={order} />
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/admin/orders',
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