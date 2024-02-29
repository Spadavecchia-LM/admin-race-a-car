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
               
        }

    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const getAutos = async () => {

        try{
            const response = await fetch("http://localhost:8085/autos/all")

            if(response.ok){
                const data = await response.json()

                dispatch({type:"GET_AUTOS", payload: data})
            }
        }catch(err){
            console.log(err)
        }

    }


    useEffect(() => {
        if(state.isLogged){
            getAutos()
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