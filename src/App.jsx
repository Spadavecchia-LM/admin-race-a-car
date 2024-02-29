import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import Login from "./Components/pages/Login"
import AutosTable from "./Components/pages/AutosTable"

import AgregarAuto from "./Components/pages/AgregarAuto"

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
  </Routes>
  <Footer/>
  </>
  }

    </>
  )
}

export default App