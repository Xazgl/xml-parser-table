// @ts-check

const { PrismaClient } = require("@prisma/client");
const fs = require('fs/promises');
const path = require("path");
const xml2js = require('xml2js')

const db = new PrismaClient()
const parser = new xml2js.Parser()

async function start() {
    try {
        const data = await fs.readFile(path.join(process.cwd(), './xml/mitsuNew.xml'), 'utf8');
        const xml = await parser.parseStringPromise(data)
        // database.table[]=>column[]{$:{name:string}, _:string} 
        const cars = xml.database.table.map(table => {
            const car = {}
         
            table.column.forEach(column => {
                car[column.$.name] = column._
            })
            return {
                id_1c: parseInt(car.id),
                brand: car.brand,
                VIN: car.VIN,
                model: car.model
            }
        })
        // console.log(cars);
        db.$transaction([
            db.cars.deleteMany(),
            db.cars.createMany({
                data: cars
            })
        ]) 
        console.log("Success"); 
    } catch (error) {
        console.error(error)
    }
}

start()