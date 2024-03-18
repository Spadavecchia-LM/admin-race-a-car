import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import Login from "./Components/pages/Login"
import AutosTable from "./Components/pages/AutosTable"
import CategoriasTable from "./Components/pages/CategoriasTable"
import AgregarAuto from "./Components/pages/AgregarAuto"
import { useContext, useEffect, useState } from "react"
import Error from "./Components/pages/Error"
import { GlobalContext } from "./Context/AppContext"
import UsuariosTable from "./Components/pages/UsuariosTable"
import NotLogged from "./Components/pages/NotLogged"
import ItemsTable from "./Components/pages/itemsTable"



function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  const {state} = useContext(GlobalContext)
  const {isLogged} = state

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
  },)

  return (
    <>

  {screenWidth < 1024 ? <Error/> :
  <>
  
  <Routes>
  <Route path="/dashboard" element={isLogged ? <Home/> : <NotLogged/>}/>
  <Route path="/" element={ <Login/>}/>
  <Route path="/dashboard/autos" element={isLogged ? <AutosTable/> : <NotLogged/>}/>
  <Route path="/dashboard/agregar/auto" element={isLogged ? <AgregarAuto/> : <NotLogged/>}/>
  <Route path="/dashboard/categorias" element={isLogged ? <CategoriasTable/> : <NotLogged/>}/>
  <Route path="/dashboard/usuarios" element={isLogged  ? <UsuariosTable/> : <NotLogged/>}/>
  <Route path="/dashboard/items" element={isLogged  ? <ItemsTable/>: <NotLogged/>}/>

  <Route/>
  <Route/>
  <Route/>
  </Routes>
  <Footer/>
  </>
  }

    </>
  )
}

export default App