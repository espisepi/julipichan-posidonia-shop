
// Codigo que se ha puesto para que compile la aplicacion con este fichero vacio
export {}

//  NO SE USA ACTUALMENTE, SE HA PUESTO EL FICHERO EN LA RAIZ DEL PROYECTO PORQUE ASI ES COMO NEXTJS TIENE EN CUENTA LOS MIDDLEWARE AHORA

// import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// // import { jwt } from '../../utils';


// export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

//     const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     if ( !session ) {
//         const requestedPage = req.page.name;
//         return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
//     }

//     const validRoles = ['admin','super-user','SEO'];

//     if ( !validRoles.includes( session.user.role ) ) {
//         return NextResponse.redirect('/');
//     }


//     return NextResponse.next();



// }


