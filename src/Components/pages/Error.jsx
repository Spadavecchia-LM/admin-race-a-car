import React from 'react'

const Error = () => {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-10 bg-primaryBlue'>
        <h1 className='text-primaryWhite'>No disponible para celular, lo sentimos mucho.</h1>
        <img src='../src/assets/denied.svg' className='h-1/2' />
    </div>
  )
}

export default Error