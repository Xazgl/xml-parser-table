import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import db from '../../prisma';
// import  clientsModel  from '../src/schema/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, phone, carModal, carYear } = req.body
        try {
            //письмо
            let testEmailAccount = await nodemailer.createTestAccount()
            let transporter = nodemailer.createTransport({
                host: 'smtp.yandex.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'UriyAPKOHT@yandex.ru',
                    pass: 'sgqwqfsmmnajkskr',
                },
            })
            let result = await transporter.sendMail({
                from: '"Заявка на TradeIn" UriyAPKOHT@yandex.ru',
                to: 'UriyAPKOHT@yandex.ru',
                subject: 'Заявка на Trade',
                text: `Заявка Trade In от ${name} ${phone} машина ${carModal} ${carYear} с opel.ru`,
                html:
                    `Заявка Trade In  от ${name} ${phone} машина ${carModal} ${carYear} с opel.ru`,
            })
            //регистрация в базу
            const clientSend = await db.clientTradein.create({data: {
                name,
                phone,
                carYear,
                carModal
            }})
            res.send(clientSend);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Ошибка сервера" })
        }
    } else {
        res.status(404).send({ message: "Неверный адрес" })
    }
}