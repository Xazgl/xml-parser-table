import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../prisma';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';
import { sign } from '../../src/services/signature'
import { setCookies } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { login, pass } = req.body as {login: string, pass: string}
        try {
            const adminByLogin = await db.admin.findUnique({ where: { login } })
            if (adminByLogin) {
                if (await bcryptjs.compare(pass, adminByLogin.passwordHash)) {
                    // sessions
                    const sessionToken = nanoid()
                    const token = sign(sessionToken, process.env.SECRET!)
                    setCookies('sid', token, { req, res, maxAge: 60 * 60 * 24 });
                    //   res.cookie('sid',token,{httpOnly:true,maxAge:2*24*60*60*1000})
                    const session = await db.session.create({
                        data: {
                            sessionToken: sessionToken,
                            expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
                            adminId: adminByLogin.id
                        }
                    })
                    res.send({ redirectUrl: '/' })
                } else {
                    res.status(401).send({ status: 'Incorrect credentials' })
                }
            } else {
                res.status(401).send({ status: 'Incorrect credentials' })
            }
        } catch (error) {
            res.status(500).send({ message: "Ошибка сервера" })
        }
    } else {
        res.status(404).send({ message: "Неверный адрес" })
    }
}