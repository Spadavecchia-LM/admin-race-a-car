import { Button, Input, Spinner } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../Context/AppContext'

const AgregarCategoria = () => {

  const{state,dispatch} = useContext(GlobalContext)

  const [isLoading, setIsLoading] = useState(false)

  const [nuevaCategoria, setNuevaCategoria] = useState({
    categoria:""
  })
  const handleChange = (e) => {
    const {name, value} = e.target

    setNuevaCategoria({...nuevaCategoria, [name]:value})
  }
  const refresh = async() => {
    try{
      const response = await fetch("http://44.204.2.67:8085/categoria/all")
      if(response.ok){
        const data = await response.json()
        dispatch({type:"GET_CATEGORIAS",payload: data})
      }
    }catch(err){
      console.log(err)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try{
      const response = await fetch("http://44.204.2.67:8085/categoria", {method:"POST", body: JSON.stringify(nuevaCategoria), headers:{"Content-Type": "application/json", "idRol": state.admin.rolUsuario.id}})

      if(response.ok){
        alert("agregado con exito!")
        setNuevaCategoria({categoria:""})
        document.querySelector("#form").reset()
        refresh()
      }

    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  }

  return (
  <form id='form' onSubmit={handleSubmit} className='flex flex-col gap-5 w-full h-full'>
      <Input type='text' variant='underlined' label={"nombre de la categoria"} name='categoria' onChange={handleChange}/>
      {isLoading ? <Spinner/> : <Button size="md" variant='solid' className='w-1/2 mx-auto' color='warning' type='submit'>enviar</Button>
}
  </form>
  )
}

export default AgregarCategoria