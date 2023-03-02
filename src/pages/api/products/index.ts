import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '@/features/next-teslo'
import { Product } from '@/features/next-teslo';
import { IProduct } from '@/features/next-teslo';

type Data = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { gender = 'all' } = req.query;

    let condition = {};

    if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
        condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition)
                                .select('title images price inStock slug -_id')
                                .lean();

    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            let imageSrc = image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`;
            // En produccion aparece el error de que la imagen del producto tiene esta url: ...sv.ondigitalocean.app/product/products/1740507-00-A_1.jpg
            // Por esa razon hacemos el siguiente filtrado
            if(imageSrc.includes("/product/")) {
                // Con la siguiente linea el resultado deberia ser:  ...sv.ondigitalocean.app/products/1740507-00-A_1.jpg
                imageSrc = imageSrc.replace('/product/', '/');
            }
            console.log("image src del producto: " + imageSrc);
            return imageSrc;
        });

        return product;
    })


    return res.status(200).json( updatedProducts );

}
