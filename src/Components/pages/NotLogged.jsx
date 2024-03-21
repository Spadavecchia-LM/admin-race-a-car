import { Button } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotLogged = () => {
    const navigate = useNavigate()

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-10 bg-primaryWhite'>
    <Button color='danger' variant='flat' onClick={()=> navigate("/")}>por favor, inicia sesión</Button>
    <img src='https://res.cloudinary.com/leoms96/image/upload/v1709848810/autos/Login-rafiki_lj0psx.svg' className='h-1/2' />
</div>
  )
}

export default NotLogged