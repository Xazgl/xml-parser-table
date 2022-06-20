
import { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';


export default async function xml (req:NextApiRequest,res:NextApiResponse) {
    if(req.method==='GET') {
            try{
                 const parseString = require('xml2js').parseString;
                 const fs = require('fs');
                 const path = require('path')
                 const data = fs.readFileSync(path.join(process.cwd(), '/public/xml/mitsuNew.xml'));
                // const data = fs.readFileSync(path.join(process.cwd(), '/public/xml/3.csv'));
                  parseString(data, function (err, result) {
                    try {
                        
                       res.status(200).json({ result })      
                    } catch {
                        console.log(err);
                    }
                    
                  });
                }       
                // var rawFile = new XMLHttpRequest();
                // rawFile.open("GET", XMLData, false);
                // rawFile.onreadystatechange = () => {
                //     if (rawFile.readyState === 4) {
                //         if (rawFile.status === 200 || rawFile.status == 0) {
                //             var xmlasstring = rawFile.responseText;
                //             console.log('Your xml file as string', xmlasstring)
                //         }
                //     }

            //   let parser = new  xml2js.Parser()

            //   const resultData = () =>  parser.parseString('/public/xml/data.xlsx', function (err,result) {
            //   JSON.stringify(result)
            //   return console.log(resultData)
            //   }) 
            catch(error) {
                console.log(error)
                res.status(404).send({message:"Ошибка сервера"})
            }
    }else{
        res.status(404).send({message:"Запрос не Get"})
    }
}

// export default async function parseXML(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//             require('fs').readFile('/public/xml/data.xlsx', function (err, data) {
//             let answer = new xml2js.Parser().parseString(data, function (err, result) {
//                 console.dir(result);
//                 console.log('Done');
//             });
//             }
//         }else{
//       res.status(404).send({message:"Запрос не Get"})
//     }
// };


