import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react';

import { LoginPage as LoginPageTeslo } from '@/features/next-teslo';


const LoginPage = () => {
    return (
        <LoginPageTeslo />    
    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}



export default LoginPage