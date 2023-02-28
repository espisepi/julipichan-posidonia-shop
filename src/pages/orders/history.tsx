import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';

import { dbOrders } from '@/features/next-teslo';
import { IOrder } from '@/features/next-teslo';

import { HistoryPage as HistoryPageTeslo } from '@/features/next-teslo';



interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

  return (
    <HistoryPageTeslo orders={orders} />
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );


    return {
        props: {
            orders
        }
    }
}



export default HistoryPage