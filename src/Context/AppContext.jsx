import { createContext, useEffect, useReducer } from "react";



export const GlobalContext = createContext()

const AppContext = ({children}) => {

    const initialState = {
        isLogged:false,
        admin:null,
      
        autos:[],
        categorias:[],
        usuarios:[],
        items:[],
        reservas:[]
    }

    const reducer = (state, action) => {
        switch(action.type){
                case "GET_AUTOS":
                return {...state, autos: action.payload}
                case "LOGIN":
                return {...state, isLogged: true}
                case "LOGOUT":   
                return {...state, isLogged: false, admin:null}
                case "SET_ADMIN":
                return {...state, admin: action.payload}
                case "GET_CATEGORIAS":
                return {...state, categorias: action.payload}
               case "GET_USUARIOS":
                return {...state, usuarios: action.payload}
                case "GET_ITEMS":
                return {...state, usuarios: action.payload}
        }

    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const getAutos = async () => {

   

        try{
            const response = await fetch("http://localhost:8085/autos/all", 
            {
                headers: {
                    "idRol": state.admin.rolUsuario.id
                }
            })

            if(response.ok){
                const data = await response.json()

                dispatch({type:"GET_AUTOS", payload: data.sort((a,b) => a.id - b.id )})
            }
        }catch(err){
            console.log(err)
        }
    }
    const getCategorias = async () => {
        try{
            const response = await fetch("http://localhost:8085/categoria/all")

            if(response.ok){
                const data = await response.json()

                dispatch({type:"GET_CATEGORIAS", payload: data})
            }
        }catch(err){
            console.log(err)
        }
    }


    const getUsuarios = async () => {
   
        try{
            const response = await fetch("http://localhost:8085/usuarios/all",  {
                headers: {
                    "idRol": state.admin.rolUsuario.id
                }
            })

            if(response.ok){
                const data = await response.json()

                dispatch({type:"GET_USUARIOS", payload: data})
            }
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        if(state.isLogged){
            getAutos()
            getCategorias()
            getUsuarios()
        }

    },[state.isLogged])

    console.log(state)

    return(
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default AppContext