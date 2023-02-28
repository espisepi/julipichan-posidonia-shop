import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { RegisterPage as RegisterPageTeslo } from '@/features/next-teslo';



const RegisterPage = () => {
    return (
        <RegisterPageTeslo />
    )
}



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

export default RegisterPage