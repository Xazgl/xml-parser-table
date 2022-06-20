import { Client, Sales,ClientеTradeIn } from "@prisma/client";

export type CarsDto = Omit<Car, 'id_1c' | 'brand' | 'model' | 'VIN' >
export type ClientеTradeInDto = Omit<ClientеTradeIn, 'updatedAt'>

export type CreateSaleDto = Pick<Sales, 'title' | 'description'>
export type AllSaleDto = Pick<Sales, 'id' | 'title' | 'description' | 'img' | 'active' |'createdAt'>

