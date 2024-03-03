import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import Login from "./Components/pages/Login"
import AutosTable from "./Components/pages/AutosTable"
import CategoriasTable from "./Components/pages/CategoriasTable"
import AgregarAuto from "./Components/pages/AgregarAuto"
import AgregarCategoria from "./Components/pages/AgregarCategoria"
import { useContext, useEffect, useState } from "react"
import Error from "./Components/pages/Error"
import { GlobalContext } from "./Context/AppContext"
import UsuariosTable from "./Components/pages/UsuariosTable"

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
  <Route path="/dashboard" element={<Home/>}/>
  <Route path="/" element={ <Login/>}/>
  <Route path="/dashboard/autos" element={<AutosTable/>}/>
  <Route path="/dashboard/agregar/auto" element={<AgregarAuto/>}/>
  <Route path="/dashboard/categorias" element={<CategoriasTable/>}/>
  <Route path="/dashboard/usuarios" element={<UsuariosTable/>}/>

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