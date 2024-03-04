import React, { useContext, useEffect, useState } from 'react'
import Header from "../Header"
import {Button, Input, Select, SelectItem, Spinner} from "@nextui-org/react";

import { GlobalContext } from '../../Context/AppContext';
import { uploadFiles } from '../../firebase/config';

const AgregarAuto = () => {

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getCategorias = async () => {
            const response = await fetch("http://localhost:8085/categoria/all")

            if(response.ok){
                const data = await response.json()
                setCategorias([...data])
            }
        }
        getCategorias()

    },[])

    const {state,dispatch} = useContext(GlobalContext)

    const refresh = async() => {
        try{
          const response = await fetch("http://localhost:8085/autos/all")
          if(response.ok){
            const data = await response.json()
            dispatch({type:"GET_AUTOS",payload: data})
          }
        }catch(err){
          console.log(err)
        }
      }

    const [categorias, setCategorias] = useState([])


    const [nuevoAuto, setNuevoAuto] = React.useState(
        {
            marca:"",
            modelo:"",
            color:"",
            idCategoria:null,
            anio: null,
            capacidad: null,
            tipoDeCaja: "",
            caballosDeFuerza:null,
            traccion:"",
            combustion:"",
            valor:null,
            disponible:true,
            images: []
        }
    )
    const [imagenes, setImagenes] = useState([])

    const handleInputChange = (e) => {
    
        const {name, value} = e.target

        setNuevoAuto({...nuevoAuto, [name]: value})
    }


    const handleFilesOnChange = (e) => {
        setImagenes([...imagenes, ...e.target.files])
    }
 





    //sin validaciones
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const uploadPromises = imagenes.map((image) => uploadFiles(image))

       
        try {
            const urls = await Promise.all(uploadPromises)
          
       
          
              const postAutoPromise = fetch("http://localhost:8085/autos", {
                method:"POST",
                headers:{
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({...nuevoAuto, images: urls})
              });
          
          
            const postAutoResponse = await postAutoPromise;
          
            if(postAutoResponse.ok){
              alert("el auto se agrego correctamente");
              setNuevoAuto({
                marca:"",
                modelo:"",
                color:"",
                idCategoria:null,
                anio: null,
                capacidad: null,
                tipoDeCaja: "",
                caballosDeFuerza:null,
                traccion:"",
                combustion:"",
                valor:null,
                disponible:true,
                images: []
              });
              setIsLoading(false);
              document.querySelector("#form").reset();
              refresh();
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }


 

  return (
  <>
  <Header/>
  <div className=' w-screen pt-5 pb-5 bg-secondaryBlue'>
  <h1 className='text-center text-fsHero text-primaryWhite'>Agregar vehículo</h1>
    <form className='w-[90%] grid grid-cols-2 gap-5 mx-auto  p-10' id='form' onSubmit={handleSubmit}>
        

        <div className='flex items-center justify-around gap-5'>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>marca</span>
            <Input className='w-1/2' name='marca' label="marca"  variant='flat' size='md' onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>modelo</span>
            <Input className='w-1/2' name='modelo' label="modelo"  variant='flat' size='md' onChange={handleInputChange}  ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>color</span>
            <Input className='w-1/2' name='color' label="color"  variant='flat' size='md'  onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>año</span>
            <Input className='w-1/2' name='anio' label="año" type='number' variant='flat' size='md' onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>capacidad</span>
            <Input className='w-1/2' name='capacidad' label="capacidad" type='number'  variant='flat' size='md' onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>caballos de fuerza</span>
            <Input className='w-1/2' name='caballosDeFuerza' label="caballos de fuerza" type='number'  variant='flat' size='md' onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>categoria</span>
            <Select className='w-1/2' name='idCategoria' label="categoria"  variant='flat' size='md'  onChange={handleInputChange}>
                {categorias?.map((categoria) => {
                    return(
                        <SelectItem key={categoria.id} value={categoria.id}>{categoria.categoria}</SelectItem>
                    )
                })}
            </Select>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>tipo de caja</span>
            <Select className='w-1/2' name='tipoDeCaja' label="caja"  variant='flat' size='md' onChange={handleInputChange} >
                <SelectItem key={"Automática"} value={"Automática"} >Automatica</SelectItem>
                <SelectItem key={"Manual"} value={"Manual"} >Manual</SelectItem>
            </Select>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>combustion</span>
            <Select className='w-1/2' name='combustion' label="combustion"  variant='flat' size='md' onChange={handleInputChange} >
                <SelectItem key={"Naftero"} value={"Naftero"} >Naftero</SelectItem>
                <SelectItem key={"Hibrido"} value={"Hibrido"} >Hibrido</SelectItem>
                <SelectItem key={"Electrico"} value={"Electrico"}>Electrico</SelectItem>
            </Select>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>traccion</span>
            <Select className='w-1/2' name='traccion' label="traccion"  variant='flat' size='md' onChange={handleInputChange} >
                <SelectItem key={"Delantera"} value={"Delantera"} >Delantera</SelectItem>
                <SelectItem key={"Trasera"} value={"Trasera"} >Trasera</SelectItem>
                <SelectItem key={"Integral"} value={"Integral"}>Integral</SelectItem>
            </Select>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>valor</span>
            <Input className='w-1/2' name='valor' label="valor" type='number' variant='flat' size='md' onChange={handleInputChange} ></Input>
        </div>
        <div className='flex items-center justify-around gap-5 '>
            <span className='w-1/2 bg-primaryGold text-primaryWhite rounded-md text-center py-[14px]'>imagenes</span>
            {/* mas adelante cambiar a tipo file */}
            <input className='w-1/2 text-primaryWhite' name='imagenes' type='file' multiple  size='md' onChange={handleFilesOnChange} ></input>
        </div>

        <div className='flex mt-10 col-span-2 '>
        <Button className='w-1/4 mx-auto bg-primaryBlue text-primaryWhite' size='lg' type='submit'>{isLoading ? <Spinner/> : "confirmar vehiculo"}</Button>
        </div>

    </form>
  </div>
  </>
  )
}

export default AgregarAuto