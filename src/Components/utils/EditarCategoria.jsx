import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/AppContext'
import { Button, Input,Spinner } from '@nextui-org/react'


const EditarCategoria = ({categoria}) => {


    const {state,dispatch} = useContext(GlobalContext)
    const [cat, setCat] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    


    const refresh = async () => {
        try {
          const response = await fetch(import.meta.env.VITE_BACKENDURL+ "/categoria/all");
          if (response.ok) {
            const data = await response.json();
            dispatch({ type: "GET_CATEGORIAS", payload: data });
          }
        } catch (err) {
          console.log(err);
        }
      };

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            const response = await fetch(import.meta.env.VITE_BACKENDURL + "/categoria/" + categoria.id,{
                method:"PUT",
                body: JSON.stringify(cat), 
                headers:{
                    "idRol": state.admin.rolUsuario.id,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                alert("cambio realizado con exito")
                refresh()
            }
        }catch(err){
            console.log(err)
            
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <form onSubmit={handleSubmit} className='p-10'>
    <h3>actualizar categoria: {categoria.categoria}</h3>
    <div className='flex flex-col gap-5 items-center justify-center'>
    <Input type='text' label="nuevo nombre" labelPlacement='outside' value={cat} onValueChange={setCat}/>
    <Button size='sm' type='submit' color='warning' className='text-primaryWhite'>{isLoading ? <Spinner/> : "actualizar"}</Button>

    </div>
</form>
  )
}

export default EditarCategoria