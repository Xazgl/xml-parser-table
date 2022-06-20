import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { CarsDto } from '../../@types';
import db from '../../prisma';
import { Cars } from '@prisma/client';
import { CarpenterSharp } from '@mui/icons-material';
import { nanoid } from 'nanoid';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'id_1c ', headerName: 'id_1c ', width: 200 },
  { field: 'brand', headerName: 'Бренд', width: 200 },
  { field: 'model', headerName: 'Модель', width: 300 },
  { field: 'VIN', headerName: 'VIN', width: 300 }
];

export default function TableService() {
  
  const [cars, setCars] = useState<CarsDto[]>([])

  useEffect(() => {
    (async function () {
        const res = await fetch('/api/allCars')
        if (res.ok) {
           setCars(await res.json())
        }
    })()
}, [])
  // async function giveXml() {

  //   const res = await fetch('/api/xml', {
  //     headers: {
  //       //'Authorization': 'bearer ' + localStorage.getItem('Token')
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   if (res.ok) {
  //     const xml = await res.json()//объект?
  //     console.log(xml)
  //     // console.log(JSON.stringify(xml).split("(?<=\\})(?=\\{)"))

  //      const table = xml.result.database.table// получаю саму таблицу без оглавления
  //      console.log(table)
 
  //     for (let i = 0; i < table.length; i++) {
  //       // let strArr = JSON.stringify(table[i].column).split("(?<=\\})(?=\\{)")
  //       // console.log(strArr)
  //       let strArr = table[i].column
  //       let nameBrend = xml.result.database.table[0].column[3]
  //       let model = xml.result.database.table[0].column[4]
  //       let arr =[nameBrend,model]
  //       console.log(model)
  //       }
  //     }
  //   }
  


  return (
    <>

      {/* <button onClick={giveXml}></button> */}
      <div className="table" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={cars}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[3]}
          checkboxSelection
        />
      </div>
      {/* <div className='container'>
        <button className='btn'>Выйти</button>
        <button className='btn'>Показать самые новые</button>
      </div> */}


      <style jsx>{`
    .container{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    .btn {
    font-family: 'Montserrat', sans-serif;
    border-radius: 3px;
    border:none;
    transition: transform.3s ;
    color: #ffffff;
    background-color: #48484d;
    width: 350px;
    height: 50px;
    font-size: 30px;
    margin-top:30px;
}

.btn:hover {
    background-color: #f7ff14;
    border: none;
    font-family: 'Montserrat', sans-serif;
    color:black;
    transform: scale(1.02);
    box-shadow: -3px 15px 9px 3px rgba(34, 60, 80, 0.2);
}
`}</style>
    </>

  );
}