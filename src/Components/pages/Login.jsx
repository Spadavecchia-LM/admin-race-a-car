import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Context/AppContext'
import Swal from 'sweetalert2'
import { Spinner } from '@nextui-org/react'

const Login = () => {

    const navigate = useNavigate()

    const [isLoggingIn, setIsLogginIn] = useState(false)

    const {state, dispatch} = useContext(GlobalContext)

    const [admin, setAdmin] = useState({
      username:"",
      password:""
    })

    const handleInputChange = (e) => {
      const {name, value} = e.target

      setAdmin({...admin, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLogginIn(true)

        try{
            const settings = {
              method: "POST",
              headers:{
                "Content-type": "application/json",
                
                
              },
              body: JSON.stringify(admin),
            
              
            }

            const response = await fetch("http://44.204.2.67:8085/auth/login", settings)


            if(response.ok){
              const {token} = await response.json()
              const adminResponse = await fetch(`http://44.204.2.67:8085/usuarios/${admin.username}`, {headers:{Authorization: `Bearer: ${token}`}})
                      if(adminResponse.ok){
                        const data = await adminResponse.json()
                        
                        const {rolUsuario} = data

                        if(rolUsuario.rol === "ADMIN" || rolUsuario.rol === "SUPER_ADMIN"){
                          localStorage.setItem("Authorization", token)
                          dispatch({type:"LOGIN"})
                          dispatch({type:"SET_ADMIN", payload: data})
                          Swal.fire({
                            title:"Iniciaste sesión correctamente",
                            showConfirmButton:true,
                            timer:3000
                            
                          })
                          navigate("/admin/dashboard")
                        }else{
                          alert("no cuentas con permisos para acceder")
                        }

                      }

            }else{
              alert("credenciales invalidas")
            }

        }catch(err){
          console.log(err)
        }finally{
          setIsLogginIn(false)
        }



    }


  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-secondaryBlue text-primaryWhite">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primaryWhite">
        RACE-A-CAR
      </h2>
      <p className='text-center'>Panel de administración</p>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-primaryWhite">
            correo electrónico
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="username"
              type="email"
              autoComplete="email"
              onChange={handleInputChange}
              required
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primaryGreen placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryWhite">
              contraseña
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              autoComplete="current-password"
              required
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primaryGreen placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primaryBlue px-3 py-1.5 text-sm font-semibold leading-6 text-primaryWhite shadow-sm hover:bg-primaryGold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           {isLoggingIn ? <Spinner/> : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login