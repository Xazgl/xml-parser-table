import { NextApiRequest, NextApiResponse } from "next"
import db from "../../prisma"
import { Cars } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const car = await db.cars.create({
            data: {
                nameBrend,
                model
            }
        })

    }