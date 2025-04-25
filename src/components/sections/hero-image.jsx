import React from 'react'
import heroImage from '../../assets/hero-image.avif'

const HeroImage = () => {
  return (
    <div className='min-h-[400px] md:min-h-[600px] w-full bg-[#D6DEE8] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-0'>
      <div className='w-full md:w-1/2 max-w-[600px] mx-auto text-start flex flex-col gap-4 mb-8 md:mb-0'>
        <h1 className='text-4xl md:text-7xl font-600'>No es una marca más de ropa para hombres</h1>
        <a href='/products' className='bg-[#1C385C] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-light uppercase w-fit'>Comprar ahora</a>
      </div>
      <div className='w-full md:w-1/2 max-w-[1000px] md:pr-12'>
        <img src={heroImage} alt='hero-image' className='w-full h-full object-cover' loading="lazy" />
      </div>
    </div>
  )
}

export default HeroImage