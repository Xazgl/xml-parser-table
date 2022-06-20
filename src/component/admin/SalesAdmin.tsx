import { FilterFrames } from '@mui/icons-material'
import { Button, ImageList, ImageListItem, Input, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Sales } from '@prisma/client'
import React, { ChangeEvent, useMemo, useRef } from 'react'
import { Dispatch, FormEvent, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import salesOne from '/public/images/sales.webp'
import salesTwo from '/public/images/sales2.webp'
import salesThree from '/public/images/sales3.webp'
import ImageIcon from '@mui/material/Icon';

// function InputButton() {

//   const fileInput = React.useRef<HTMLInputElement>(null);

//   return (
//     <form>
//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={()=>fileInput.current!.click()}
//       >
//         upload file
//       </Button>

//       <input 
//         ref={fileInput} 
//         type="file" 
//         style={{ display: 'none' }} 
//         accept=".jpg, .jpeg, .png"
//       />
//     </form>
//   );
// }



type SalesAdminProps = {}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'title', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    { field: 'img', headerName: 'img', width: 150 }
];

export function SalesAdminComponent({ }: SalesAdminProps) {
    const [sales, setSales] = useState<Sales[]>([])
    const [showAdd, setShowAdd] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const fileRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | null>(null)
    //   const [imageURL, setimageURL] = useState<string>('')
    //   console.log('RENDER');

    //   useEffect(() => {
    //     if (image) setimageURL(URL.createObjectURL(image))
    //   }, [image])
    //   useEffect(() => {
    //     fetch('/api/getimage').then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //         setError('')
    //     }).then(res => {
    //         setImage(res.src)
    //     })
    //   }, [])
    const imageURL = useMemo(() => image ? URL.createObjectURL(image) : '', [image])


    useEffect(() => {
        (async function () {
            const res = await fetch('/api/sales')
            if (res.ok) {
                setSales(await res.json())
            }
        })()
    }, [])


    async function addSale(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        if (image) formData.append('image', image)
        const res = await fetch('/api/sales', {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            const newSale: Sales = await res.json()
            setSales(prevSales => {
                return [...prevSales, newSale]
            })
            setShowAdd(false)
            setTitle('')
            setDescription('')
            setImage(null)
        }
    }

    function onImageChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files ? Array.from(event.target.files) : []
        if (files.length > 0) {
            setImage(files[0])
        }
    }

    return <>
        <DataGrid
            rows={sales}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
        <Button onClick={() => setShowAdd(true)} disabled={showAdd}>Add sale</Button>
        {showAdd &&
            <>
                <form onSubmit={addSale}>
                    <TextField label="Title" variant="outlined" value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <TextField label="Description" variant="outlined" value={description}
                        onChange={e => setDescription(e.target.value)} />
                    {/* <TextField label="Img" variant="outlined" type="file" mul/> */}
                    <Button onClick={() => fileRef.current?.click()}>
                        <ImageIcon />
                        Выбрать изображения
                    </Button>
                    <input type='file' onChange={onImageChange} ref={fileRef} style={{ display: 'none' }}
                        accept=".jpg,.jpeg,.png,.webp" />
                    <Button type='submit'>Отправить</Button>
                </form>

                <ImageList sx={{ width: 300, height: 300 }} cols={1} rowHeight={164}>
                    {/* {imageURL.map((image) => ( */}
                    <ImageListItem>
                        <img
                            src={`${imageURL}`}
                            srcSet={`${imageURL}`}
                            loading="lazy"
                        />
                    </ImageListItem>
                    {/* ))} */}
                </ImageList>
            </>
        }
    </>
    //    без картинок 
    //   async function addSale(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault()

    //     const res = await fetch('/api/sales', {
    //       method: 'POST', 
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         title,
    //         description,
    //         image
    //       })
    //     })
    //     if (res.ok) {
    //       const newSale: Sales = await res.json()
    //       setSales(prevSales => {
    //         return [...prevSales, newSale]
    //       })
    //       setShowAdd(false)
    //       setTitle('')
    //       setDescription('')
    //       setImage('')
    //     }
    //   }
}