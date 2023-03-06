import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from '../../utils';

// IMPORTANTE !!!!!!!
// Antes estaba en pages/admin/_middleware.ts
// Pero se ve que no deja ya hacer la build con ese fichero ahi :(
export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // if ( !session ) {
    //     return new Response( JSON.stringify({ message: 'No autorizado' }), {
    //         status: 401,
    //         headers: {
    //             'Content-Type':'application/json'
    //         }
    //     });
    // }

    // const validRoles = ['admin','super-user','SEO'];
    // if ( !validRoles.includes( session.user.role ) ) {
    //     return new Response( JSON.stringify({ message: 'No autorizado' }), {
    //         status: 401,
    //         headers: {
    //             'Content-Type':'application/json'
    //         }
    //     });
    // }

    // ==================== ADMIN MIDDLEWARE ===============================
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if ( !session ) {
            const url = req.nextUrl.clone();
            const pathnameRedirect = url.pathname;
            url.pathname = `/auth/login`;
            url.searchParams.append('p', pathnameRedirect);
            // console.log(url.toString())
            return NextResponse.redirect(url);
        }

        // const validRoles = ['admin','super-user','SEO'];

        // if ( !validRoles.includes( session.user.role ) ) {
        //     const url = req.nextUrl.clone();
        //     url.pathname = '/'
        //     return NextResponse.rewrite(url)
        // }

        // if (req.nextUrl.pathname.startsWith('/about')) {
        //     return NextResponse.rewrite(new URL('/about-2', req.url))
        // }
    }

    // ==================== CHECKOUT MIDDLEWARE ===============================
    // if (req.nextUrl.pathname.startsWith('/checkout')) {
    //     if ( !session ) {
    //         const requestedPage = req.page.name;
    //         return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
    //     }
    // }


    return NextResponse.next();

}


