import React from 'react'
import heroImage from '../../assets/hero-image.avif'

const HeroImage = () => {
  return (
    <div className='min-h-[600px] w-full bg-[#D6DEE8] flex items-center justify-between px-8'>
      <div className='w-1/2 max-w-[600px] mx-auto text-start flex flex-col gap-4'>
        <h1 className='text-7xl font-600'>No es una marca más de ropa para hombres</h1>
        <a href='#' className='bg-[#1C385C] text-white px-8 py-4 text-lg font-light uppercase w-fit'>Comprar ahora</a>
      </div>
      <div className='w-1/2 max-w-[1000px] pr-12'>
        <img src={heroImage} alt='hero-image' className='w-full h-full object-cover' loading="lazy" />
      </div>
    </div>
  )
}

export default HeroImage