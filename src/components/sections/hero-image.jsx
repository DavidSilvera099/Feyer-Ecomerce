import React from 'react'
import heroImage from '../../assets/hero-image.avif'
import { Link } from 'react-router-dom'

const HeroImage = () => {
  return (
    <div className='min-h-[400px] md:min-h-[600px] w-full bg-[#D6DEE8] flex flex-col md:flex-row items-center justify-between px-4 md:px-0 py-8 md:py-0'>
      <div className='w-full md:w-1/2 mx-auto text-start flex flex-col gap-4 mb-8 md:mb-0 px-0 md:px-8'>
        <h1 className='text-4xl max-w-[600px] md:text-7xl font-600'>No es una marca más de ropa para hombres</h1>
        <Link to='/products' className='bg-[#1C385C] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-light uppercase w-fit'>Comprar ahora</Link>
      </div>
      <div className='w-full md:w-1/2 h-full flex items-center'>
        <img 
          src={heroImage} 
          alt='hero-image' 
          className='w-full h-full object-cover min-h-[300px] md:min-h-[600px]' 
          loading="lazy" 
        />
      </div>
    </div>
  )
}

export default HeroImage