import React from 'react'
import Hero from './utils/Hero'
import Header from './Header'

const Home = () => {
  return (
    <div className='bg-secondaryBlue text-primaryWhite'>
      <Header/>
        <Hero/>
    </div>
    
  )
}

export default Home