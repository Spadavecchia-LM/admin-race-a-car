import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import Login from "./Components/pages/Login"
import AutosTable from "./Components/pages/AutosTable"
import PublicacionesTable from "./Components/pages/PublicacionesTable"
import AgregarAuto from "./Components/pages/AgregarAuto"
import AgregarPublicacion from "./Components/pages/AgregarPublicacion"
import { useEffect, useState } from "react"
import Error from "./Components/pages/Error"

function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    console.log(screenHeight)
    console.log(screenWidth)


  },)

  return (
    <>



  <Routes>
  <Route path="/dashboard" element={<Home/>}/>
  <Route path="/" element={screenWidth > 1024 ? <Login/> : <Error/>}/>
  <Route path="/dashboard/autos" element={<AutosTable/>}/>
  <Route path="/dashboard/publicaciones" element={<PublicacionesTable/>}/>
  <Route path="/dashboard/agregar/auto" element={<AgregarAuto/>}/>
  <Route path="/dashboard/agregar/publicacion" element={<AgregarPublicacion/>}/>
  </Routes>
  <Footer/>
    </>
  )
}

export default App