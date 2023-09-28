// TODO: Mirar la respuesta del chatgpt: https://chat.openai.com/c/900a87af-1bf8-4bde-8cfa-61dccfc10f70

// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import GLB, { IGLB } from '@/features/next-teslo/mongodb/models/GLB'

const storage = multer.memoryStorage()
const upload = multer({ storage })

export const config = {
  api: {
    bodyParser: false,
  },
}

interface NextApiRequestCustom extends NextApiRequest {
  file: any /*Express.Multer.File*/
}

export default async (req: NextApiRequestCustom, res: NextApiResponse) => {
  try {
    upload.single('glbFile')(req, res, async (error: any) => {
      if (error) {
        console.error('Error al cargar el archivo GLB', error)
        return res.status(400).json({ message: 'Error al cargar el archivo GLB' })
      }

      console.log(req)

      res.status(200).json({ message: 'Archivo GLB cargado con éxito', data: req.file })

      //   const { buffer, originalname } = req.file /*as Express.Multer.File*/

      //   const glbData: IGLB = new GLB({
      //     filename: originalname,
      //     data: buffer,
      //   })

      //   await glbData.save()

      //   res.status(200).json({ message: 'Archivo GLB cargado con éxito', data: glbData, filename: originalname })
    })
  } catch (error) {
    console.error('Error al cargar el archivo GLB', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next'
// import formidable from 'formidable';
// import fs from 'fs';

// import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config( process.env.CLOUDINARY_URL || '' );

// type Data = {
//     message: string
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     }
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

//     switch (req.method) {
//         case 'POST':
//             return uploadFile(req, res);

//         default:
//             res.status(400).json({ message: 'Bad request' });
//     }

// }

// const saveFile = async( file: formidable.File ): Promise<string> => {

//     // const data = fs.readFileSync( file.filepath );
//     // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
//     // fs.unlinkSync( file.filepath ); // elimina
//     // return;
//     const { secure_url } = await cloudinary.uploader.upload( file.filepath );
//     return secure_url;

// }

// const parseFiles = async(req: NextApiRequest): Promise<string> => {

//     return new Promise( (resolve, reject) => {

//         const form = new formidable.IncomingForm();
//         form.parse( req, async( err, fields, files ) => {
//             // console.log({ err, fields, files });

//             if ( err ) {
//                 return reject(err);
//             }

//             const filePath = await saveFile( files.file as formidable.File )
//             resolve(filePath);
//         })

//     })

// }

// const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

//     const imageUrl = await parseFiles(req);

//     return res.status(200).json({ message: imageUrl });

// }
