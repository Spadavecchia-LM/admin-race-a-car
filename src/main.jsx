import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './Context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContext>
  <NextUIProvider>
  <App />
</NextUIProvider>
  </AppContext>
  </BrowserRouter>

  
)
