import { Button, Input } from '@nextui-org/react'
import { Spinner } from 'flowbite-react'
import React, { useState } from 'react'

const EditarItemIncluido = ({item}) => {

    const [nombre, setNombre] = React.useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            const response = await fetch("http://localhost:8085/items/editar/"+ item.id,{
                method:"PUT",
                body: nombre
            })
            if(response.ok){
                alert("cambio realizado con exito")
            }
        }catch(err){
            console.log(err)
            
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='p-10'>
        <h3>actualizar item con id: {item.id}</h3>
        <div className='flex flex-col gap-5 items-center justify-center'>
        <Input type='text' label="nuevo nombre" labelPlacement='outside' value={nombre} onValueChange={setNombre}/>
        <Button size='sm' type='submit' color='warning' className='text-primaryWhite'>{isLoading ? <Spinner/> : "actualizar"}</Button>

        </div>
    </form>
  )
}

export default EditarItemIncluido