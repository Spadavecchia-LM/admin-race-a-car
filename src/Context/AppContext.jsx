import { createContext, useEffect, useReducer } from "react";
import { autos } from "../Components/utils/data";


export const GlobalContext = createContext()

const AppContext = ({children}) => {

    const initialState = {
        autos:[],
        publicaciones:[]
    }

    const reducer = (state, action) => {
        switch(action.type){
                case "GET_AUTOS":
                return {...state, autos: action.payload}
                case "DELETE_AUTO":
                const itemIndex = state.autos.findIndex(auto => auto.id == action.payload)
                
                const nuevoArray = [
                    ...state.autos.slice(0, itemIndex),
                    ...state.autos.slice(itemIndex + 1)
                  ];
                return {...state, autos: nuevoArray}
                case "ADD_AUTO":
                return {...state, autos: [...state.autos, action.payload]}
                case "TOGGLE_ESTADO":
                    const updatedAutos = state.autos.map((auto) => {
                        if (auto.id === action.payload) {
                          // Cambiar el estado al valor opuesto (true a false y viceversa)
                          return { ...auto, Estado: !auto.Estado };
                        }
                        return auto;
                      });
                      return { ...state, autos: updatedAutos };

        }

    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({type:"GET_AUTOS", payload: autos})
    },[])

    console.log(state.autos)

    return(
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default AppContext