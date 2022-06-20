import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../prisma';
import prisma from '../../prisma';
import checkSession from '../../src/services/checkCookie';

export default async function findcars(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const token = req.cookies['sid']
            const admin = await checkSession(token)
            if (admin) {
                const cars = await db.cars.findMany()
                res.send(cars)
            } else {
                res.status(403).send({ message: "Нет прав доступа" })
            }
        }catch (error) {
            console.error(error)
            res.status(500).send({ message: "Ошибка сервера" })
        }
    }else {
        res.status(404).send({ message: "Неверный адрес" })
    }
}

