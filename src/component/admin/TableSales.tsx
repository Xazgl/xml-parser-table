import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Client, ClientTradein, Sales } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { AllSaleDto } from '../../../@types';



export function TableSales() {
  const [sales, setSales] = useState<AllSaleDto[]>([])
  const [deleteSale, setDeleteSale] = useState(false)
  const [statusSale, setStatusSale] = useState(true)

  const updateSale = useCallback(async ({ id, active }: Pick<AllSaleDto, 'id' | 'active'>) => {
    const res = await fetch('/api/sales/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ active: !active })
    })
    if (res.ok) {
      setSales(prevSales => {
        return prevSales.map(sale => {
          return sale.id === id ? {...sale, active: !active} : sale
        })
      })
    }
  }, [sales])

  useEffect(() => {
    async function start() {
      const res = await fetch('/api/allSales')
      if (res.ok) {
        const sales: Sales[] = await res.json()
        setSales(sales.map(sale => {
          const { id, title, description, img, active, createdAt } = sale
          // let pictureElem = <img className="imgCustom" src={'/uploads/' + sale.img} />
          // // API: POST /api/sales/:id
          // let statusElem = <button onClick={() => setStatusSale(false)}>{active.toString()}</button>
          return { id, title, description, img, active, createdAt }
        }))
      }
    }
    start()
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'title', headerName: 'Название', width: 300 },
    { field: 'description', headerName: 'Описание', width: 700 },
    {
      field: 'picture', headerName: 'Изображение', width: 600, renderCell: (params: GridRenderCellParams<any, AllSaleDto>) => {
        return <img className="imgCustom" src={'/uploads/' + params.row.img} />
      }
    },
    {
      field: 'status', headerName: 'Статус акции', width: 300, renderCell: (params: GridRenderCellParams<any, AllSaleDto>) => {
        const { id, active } = params.row
        return <button onClick={() => updateSale({ id, active })}>{active.toString()}</button>
        // return params.row.statusElem as React.ReactNode
      }
    },
    { field: 'createdAt', headerName: 'Date', width: 300 },
    { field: 'delete', headerName: 'Удалить', width: 300 },
  ];

  return (
    <>
      <div className="title">Акции</div>
      <div className="table" style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={sales}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>


      <style jsx>{`

       .imgCustom{
        display:flex; 
        height: 100%;
        width: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;
        border-radius: 5px;
        object-fit: cover;
    }

    .imgDiv{
        display:flex; 
        height: 100%;
        width: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;
        border-radius: 5px;
    }
      `}</style>

    </>)
}