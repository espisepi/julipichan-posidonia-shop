import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/features/next-teslo';
import { IProduct } from '@/features/next-teslo';
import { Product } from '@/features/next-teslo';

type Data = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {

        case 'GET':
            return searchProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            });
    }

    
}

const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { q = '' } = req.query;

    if ( q.length === 0 ) {
        return res.status(400).json({
            message: 'Debe de especificar el query de búsqueda'
        })
    }

    q = q.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: { $search: q }
    })
    .select('title images price inStock slug -_id')
    .lean();


    await db.disconnect();




    return res.status(200).json(products);
}
