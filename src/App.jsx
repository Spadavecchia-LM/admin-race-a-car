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
  <Route path="/admin/dashboard" element={isLogged ? <Home/> : <NotLogged/>}/>
  <Route path="/admin/" element={ <Login/>}/>
  <Route path="/admin/dashboard/autos" element={isLogged ? <AutosTable/> : <NotLogged/>}/>
  <Route path="/admin/dashboard/agregar/auto" element={isLogged ? <AgregarAuto/> : <NotLogged/>}/>
  <Route path="/admin/dashboard/categorias" element={isLogged ? <CategoriasTable/> : <NotLogged/>}/>
  <Route path="/admin/dashboard/usuarios" element={isLogged  ? <UsuariosTable/> : <NotLogged/>}/>
  <Route path="/admin/dashboard/items" element={isLogged  ? <ItemsTable/>: <NotLogged/>}/>

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