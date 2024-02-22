import React, { useContext } from 'react'
import Header from "../Header"
import {Button, Input} from "@nextui-org/react";
import { autos } from '../utils/data';
import { GlobalContext } from '../../Context/AppContext';

const AgregarAuto = () => {


    const {state,dispatch} = useContext(GlobalContext)

    const [nuevoAuto, setNuevoAuto] = React.useState(
        {
            id: autos.length + 1,
            Capacidad: null,
            Categoria: "",
            Marca:"",
            Modelo:"",
            Estado: true,
            LinkFoto: ""
        }
    )

    const handleInputChange = (e) => {
        const {name, value} =  e.target

        setNuevoAuto({...nuevoAuto, [name]:value})
    }


    //sin validaciones
    const handleSubmit  = (e) => {
        e.preventDefault()
        dispatch({type:"ADD_AUTO", payload: nuevoAuto})
        alert("se agrego correctamente el auto")
        document.getElementById("form").reset()
    }
 

  return (
  <>
  <Header/>
  <div className='h-full w-screen pt-5 pb-5 bg-secondaryBlue'>

    <form className='w-1/2 mx-auto bg-[#d4d4d4] p-10' id='form' onSubmit={handleSubmit} >
        <h1 className='text-center text-fsHero text-primaryBlue'>Agregar vehículo</h1>

        <div className='flex items-center justify-around gap-5 my-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Marca</span>
            <Input className='w-1/2' name='Marca'  variant='faded' size='md' onChange={handleInputChange}></Input>
        </div>
        <div className='flex items-center justify-around gap-5 mt-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Modelo</span>
            <Input className='w-1/2' name='Modelo'  variant='faded' size='md' onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 mt-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Año</span>
            <Input className='w-1/2' name='Año' type='number' variant='faded' size='md' onChange={handleInputChange}></Input>
        </div>
        <div className='flex items-center justify-around gap-5 mt-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Capacidad</span>
            <Input className='w-1/2' name='Capacidad' type='number'  variant='faded' size='md' onChange={handleInputChange}></Input>
        </div>
        <div className='flex items-center justify-around gap-5 mt-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Categoria</span>
            <Input className='w-1/2' name='Categoria'  variant='faded' size='md' onChange={handleInputChange}></Input>
        </div>
        <div className='flex items-center justify-around gap-5 mt-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Precio</span>
            <Input className='w-1/2' name='Precio' type='number' variant='faded' size='md' onChange={handleInputChange}></Input>
        </div>
        <div className='flex items-center justify-around gap-5 mt-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>Imagen</span>
            {/* mas adelante cambiar a tipo file */}
            <Input className='w-1/2' name='LinkFoto' type='text' placeholder='Url de la foto' onChange={handleInputChange}    variant='flat' size='md'></Input>
        </div>

        <div className='flex mt-10'>
        <Button className='w-1/2 mx-auto bg-primaryBlue text-primaryWhite' type='submit'>Confirmar vehículo</Button>
        </div>

    </form>
  </div>
  </>
  )
}

export default AgregarAuto