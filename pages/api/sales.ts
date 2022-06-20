 //@ts-ignore
import { NextApiRequest, NextApiResponse } from "next";
import db  from '../../prisma';
import nextConnect from 'next-connect';
import multer from 'multer';
import { CreateSaleDto } from '../../@types';
import checkSession from "../../src/services/checkCookie";

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect<NextApiRequest & {file?: Express.Multer.File}, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res, next) => {
    const token = req.cookies['sid']
    const admin = await checkSession(token)
    if (admin) {
        return next()
    }
    next(new Error('Auth required'))
}, async (req, res) => {
    const img: string = req.file ? req.file.filename : ''
    const { title, description } = req.body as CreateSaleDto
        try {
            const newSale = await db.sales.create({
                data: {
                    title, description, active: true, img
                }
            })
            res.send(newSale)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Ошибка сервера" })
        }
    // res.status(200).json({ data: 'success' });
});

apiRoute.get(async (req, res) => {
    try {
        const sales = await db.sales.findMany()
        res.send(sales)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Ошибка сервера" })
    }
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { CreateSaleDto } from '../../@types';
// import db, { Sales } from '../../prisma';
// import multer from 'multer'
// import path from 'path';
// import { runMiddleware } from '../../src/services/middleware';

// const imageDir = path.join(__dirname, '../../../../public/images')
// const upload = multer({ dest: imageDir })

// export default async function findClient(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         await runMiddleware(req, res, upload.single('image'))
//         console.log(req.files)
//         const { title, description, img } = req.body as CreateSaleDto
//         try {
//             const newSale = await db.sales.create({
//                 data: {
//                     title, description, active: true
//                 }
//             })
//             res.send(newSale)
//         } catch (error) {
//             console.error(error)
//             res.status(500).send({ message: "Ошибка сервера" })
//         }
//     } else if (req.method === 'GET') {
//         // res.send(__dirname)
//         try {
//             const sales = await db.sales.findMany()
//             res.send(sales)
//         } catch (error) {
//             console.error(error)
//             res.status(500).send({ message: "Ошибка сервера" })
//         }
//     } else {
//         res.status(404).send({ message: "Неверный адрес" })
//     }
// }
