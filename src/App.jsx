import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Home from "./Components/Home"
import Login from "./Components/pages/Login"
import AutosTable from "./Components/pages/AutosTable"

import AgregarAuto from "./Components/pages/AgregarAuto"


function App() {

  return (
    <>



  <Routes>
  <Route path="/dashboard" element={<Home/>}/>
  <Route path="/" element={<Login/>}/>
  <Route path="/dashboard/autos" element={<AutosTable/>}/>
  <Route path="/dashboard/agregar/auto" element={<AgregarAuto/>}/>

  </Routes>
  <Footer/>
    </>
  )
}

export default App